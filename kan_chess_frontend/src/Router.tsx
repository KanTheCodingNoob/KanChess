import {Route, Routes} from "react-router";
import Game from "./pages/Game.tsx";
import Play from "./pages/Play.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Homepage from "./pages/Homepage.tsx";

export default function Router() {
	return (
		<Routes>
			<Route path={"/"} element={<Homepage />} />
			<Route path={"/game"} element={<Game />} />
			<Route path={"/play"} element={<Play />} />
			<Route path={"/register"} element={<Register />} />
			<Route path={"/login"} element={<Login />} />
		</Routes>
	)
}