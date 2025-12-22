import {Navigate, Route, Routes} from "react-router";
import Game from "./pages/Game.tsx";
import Play from "./pages/Play.tsx";

export default function Router() {
	return (
		<Routes>
			<Route path={"/"} element={<Navigate to={'/play'} replace />} />
			<Route path={"/game"} element={<Game />} />
			<Route path={"/play"} element={<Play />} />
		</Routes>
	)
}