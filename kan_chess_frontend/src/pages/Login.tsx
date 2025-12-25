import {useNavigate} from "react-router";
import {useState, type FormEvent, type ChangeEvent} from "react";
import {useLogin} from "../features/auth/hooks/useLogin.ts";

export default function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const loginMutation = useLogin();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		loginMutation.mutate(
			{ username, password },
			{
				onSuccess: () => {
					navigate("/play");
				},
			}
		);
	};

	return (
		<div className="flex flex-col items-center gap-5">
			<button
				onClick={() => navigate("/")}
				className="fixed top-4 left-4 z-50 p-2 font-bold"
				aria-label="Go back"
			>
				←
			</button>
			<button className="cursor-pointer" onClick={()=> navigate("/")}><h1>Not a Logo</h1></button>
			<div className="w-120 h-100 bg-neutral-900 flex flex-col items-center p-10 rounded-md shadow-lg">
				<form className="w-full h-full flex flex-col items-center p-5 gap-5">
					<input type="text"
					       id="username"
					       name="username"
					       placeholder="username/email"
					       className="w-full p-2 bg-gray-800 rounded-md"
					       onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
					/>
					<input type="text"
					       id="password"
					       name="password"
					       placeholder="password"
					       className="w-full p-2 bg-gray-800 rounded-md"
					       onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>

					<div className="w-full flex items-center justify-between text-sm text-gray-300">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								name="remember"
								className="accent-blue-500"
							/>
							<span>Remember me</span>
						</label>

						<button
							type="button"
							className="text-blue-400 hover:text-blue-300 hover:underline transition"
							onClick={(event) => handleSubmit(event)
							}
						>
							Forgot password?
						</button>
					</div>

					<input type="submit"
					       value="Login"
					       className="cursor-pointer bg-blue-500 hover:bg-blue-700 transition duration-300 w-full h-full mt-12 rounded-md"/>
				</form>
			</div>
		</div>
	)
}