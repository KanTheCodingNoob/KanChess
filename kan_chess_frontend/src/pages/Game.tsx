import {useSocket} from "../hooks/useSocket.ts";
import {Chessboard, type PieceDropHandlerArgs, type PieceHandlerArgs} from "react-chessboard";
import LoadingScreen from "../components/common/LoadingScreen.tsx";
import {useEffect, useRef, useState} from "react";
import {Chess} from "chess.js";
import {GAME_OVER, MOVE} from "../types/messageTypes.ts";

export default function Game(){
	const {gameStarted, color, send, lastMessage} = useSocket();
	const chessGameRef = useRef(new Chess());
	const chessGame = chessGameRef.current;

	// track the current position of the chess game in state to trigger a re-render of the chessboard
	// eslint-disable-next-line react-hooks/refs
	const [chessPosition, setChessPosition] = useState(chessGame.fen());

	// Update the board when the other player execute their move
	useEffect(() => {
		if (!lastMessage) return;

		if (lastMessage.type === MOVE && lastMessage.move) {
			const { from, to } = lastMessage.move;

			const result = chessGame.move({
				from,
				to,
			});

			if (result) {
				setChessPosition(chessGame.fen());
			}
		}

		if (lastMessage.type === GAME_OVER && lastMessage.winner) {
		}

		// eslint-disable-next-line react-hooks/refs
	}, [chessGame, lastMessage]);


	if (!gameStarted) {
		return <LoadingScreen />;
	}
	
	// handle piece drop
	const onPieceDrop = ({
		                     sourceSquare,
		                     targetSquare
	                     }: PieceDropHandlerArgs) => {
		// type narrow targetSquare potentially being null (e.g. if dropped off board)
		if (!targetSquare) {
			return false;
		}

		const isMyTurn =
			(chessGame.turn() === "w" && color === "white") ||
			(chessGame.turn() === "b" && color === "black");

		if (!isMyTurn) return false;

		// try to make the move according to chess.js logic
		try {
			chessGame.move({
				from: sourceSquare,
				to: targetSquare,
				promotion: 'q' // always promote to a queen for example simplicity
			});

			send({
				type: MOVE,
				move: {
					from: sourceSquare,
					to: targetSquare
				}
			})


			// update the position state upon successful move to trigger a re-render of the chessboard
			setChessPosition(chessGame.fen());

			// return true as the move was successful
			return true;
		} catch {
			// return false as the move was not successful
			return false;
		}
	}

	const chessboardOptions = {
		boardStyle: {
			width: '100%',
			height: '100%',
		},
		boardOrientation: color,
		position: chessPosition,
		onPieceDrop,
	}

	return (
		<div className="w-screen h-max p-8 text-center m-auto">
			<div className="flex flex-col lg:flex-row w-full h-full lg:h-full lg:justify-around gap-5">
				<div className="order-1 lg:order-0 flex flex-col justify-center items-center">
					<div className="
				          w-full
				          aspect-square
				          max-w-[90vw]
				          lg:w-[600px]
				          lg:h-[600px]
				        ">
						<Chessboard options={chessboardOptions} />
					</div>
				</div>
				<div className="order-2 h-auto rounded-md bg-neutral-600 overflow-hidden">
					<div className="bg-neutral-900 py-5">
						<h1>Color: {color}</h1>
					</div>
					<div className="flex flex-col gap-5 py-4 justify-around px-5">

					</div>
				</div>
			</div>
		</div>
	)
}