import PlayButton from "../components/Play/PlayButton.tsx";
import {Chessboard} from "react-chessboard";
import {useNavigate} from "react-router";

const chessboardOptions = {
	boardStyle: {
		width: '100%',
		height: '100%',
		cursor: 'auto'
	},
	allowDragging: false
}

export default function Play() {
	const navigate = useNavigate();

	return (
		<div className="w-screen h-max p-8 text-center m-auto">
			<div className="flex flex-col lg:flex-row w-full h-full lg:h-full lg:justify-around gap-5">
				<div className="order-1 lg:order-none flex flex-col justify-center items-center">
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
						<h1>Play chess</h1>
					</div>
					<div className="flex flex-col gap-5 py-4 justify-around px-5">
						<div className="flex flex-col gap-5 w-full">
							<PlayButton label={"Play Online"} onClick={() => navigate('/game')} />
							<PlayButton label={"Play Bots"} />
							<PlayButton label={"Play a Friend"} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}