import { useEffect, useRef, useState } from "react";
import {INIT_GAME} from "../types/messageTypes.ts";
import type {MessageContent} from "../types/messageContent.ts";

const wsURL = import.meta.env.VITE_BACKEND_WS ?? "ws://localhost:8080";

export function useSocket() {
	const socketRef = useRef<WebSocket | null>(null);

	const [gameStarted, setGameStarted] = useState(false);
	const [color, setColor] = useState<"white" | "black" | undefined>(undefined);
	const [lastMessage, setLastMessage] = useState<MessageContent>();
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		console.log("🟢 useSocket mounted");
		const ws = new WebSocket(wsURL);
		socketRef.current = ws;

		ws.onopen = () => {
			setConnected(true);
			console.log("✅ WebSocket connected");

			ws.send(JSON.stringify({ type: INIT_GAME }));
		};

		ws.onmessage = (event) => {
			const message: MessageContent = JSON.parse(event.data);
			console.log("📩 Message from server:", message);
			setLastMessage(message)

			if (message.type === "init_game") {
				setGameStarted(true);
				setColor(message.color);
			}
		};

		ws.onerror = (err) => {
			console.error("❌ WebSocket error", err);
		};

		ws.onclose = () => {
			setGameStarted(false);
			setConnected(false);
			setColor(undefined);
			// socketRef.current = null;
			console.log("🔌 WebSocket closed");
		};

		return () => {
			console.log("🔴 useSocket unmounted");
			ws.close();
		};
	}, []);

	/** Safe send helper */
	const send = (data: object) => {
		if (socketRef.current?.readyState === WebSocket.OPEN) {
			socketRef.current.send(JSON.stringify(data));
		} else {
			console.log("Ye ye ass haircut")
		}
	};

	return {
		gameStarted,
		color,
		send,
		lastMessage,
		connected
	};
}
