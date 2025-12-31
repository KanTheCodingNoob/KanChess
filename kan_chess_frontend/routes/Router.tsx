import {Route, Routes} from "react-router";
import Game from "../src/pages/Game.tsx";
import Play from "../src/pages/Play.tsx";
import Register from "../src/pages/Register.tsx";
import Login from "../src/pages/Login.tsx";
import Homepage from "../src/pages/Homepage.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";

export default function Router() {
	return (
		<Routes>
			<Route path={"/"} element={<Homepage />} />
			<Route path={"/game"} element={<Game />} />
			<Route path={"/play"} element={
				<ProtectedRoute>
					<Play />
				</ProtectedRoute>
			} />
			<Route path={"/register"} element={<Register />} />
			<Route path={"/login"} element={<Login />} />
		</Routes>
	)
}