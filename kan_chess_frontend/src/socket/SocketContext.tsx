import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState
} from "react";

const wsURL = import.meta.env.VITE_BACKEND_WS ?? "ws://localhost:8080";

type PlayerColor = "white" | "black";

interface MessageContent {
	type: string;
	color?: PlayerColor;
	move?: {
		from: string,
		to: string
	}
}

interface SocketContextValue {
	connected: boolean;
	gameStarted: boolean;
	color?: PlayerColor;
	lastMessage?: MessageContent;
	send: (data: object) => void;
	startGame: () => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
	const socketRef = useRef<WebSocket | null>(null);
	const didInitRef = useRef(false); // 👈 Strict Mode guard

	const [connected, setConnected] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [color, setColor] = useState<PlayerColor>();
	const [lastMessage, setLastMessage] = useState<MessageContent>();

	useEffect(() => {
		if (didInitRef.current) return;
		didInitRef.current = true;

		const ws = new WebSocket(wsURL);
		socketRef.current = ws;

		ws.onopen = () => {
			console.log("✅ WebSocket connected");
			setConnected(true);
		};

		ws.onmessage = (event) => {
			const message: MessageContent = JSON.parse(event.data);
			console.log("📩 Message:", message);

			setLastMessage(message);

			if (message.type === "init_game") {
				setGameStarted(true);
				setColor(message.color);
			}
		};

		ws.onerror = (err) => {
			console.error("❌ WebSocket error", err);
		};

		ws.onclose = () => {
			console.log("🔌 WebSocket closed");
			socketRef.current = null;
			setConnected(false);
			setGameStarted(false);
			setColor(undefined);
		};

		return () => {
			ws.close();
		};
	}, []);

	const send = (data: object) => {
		if (socketRef.current?.readyState === WebSocket.OPEN) {
			socketRef.current.send(JSON.stringify(data));
		}
	};

	const startGame = () => {
		send({ type: "init_game" });
	};

	return (
		<SocketContext.Provider
			value={{
				connected,
				gameStarted,
				color,
				lastMessage,
				send,
				startGame
			}}
		>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	const ctx = useContext(SocketContext);
	if (!ctx) {
		throw new Error("useSocket must be used inside SocketProvider");
	}
	return ctx;
}

