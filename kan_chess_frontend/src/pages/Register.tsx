import {useNavigate} from "react-router";
import {useState, type FormEvent, type ChangeEvent} from "react";

export default function Register() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Register function not implemented yet
		console.log("Registering:", { username, email, password });
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
				<form className="w-full h-full flex flex-col items-center p-5 gap-5"
				      onSubmit={(e) => handleSubmit(e)}>
					<input type="text"
					       id="username"
					       name="username"
					       placeholder="username"
					       className="w-full p-2 bg-gray-800 rounded-md"
					       onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
					/>
					<input type="email"
					       id="email"
					       name="email"
					       placeholder="email"
					       className="w-full p-2 bg-gray-800 rounded-md"
					       onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
					<input type="password"
					       id="password"
					       name="password"
					       placeholder="password"
					       className="w-full p-2 bg-gray-800 rounded-md"
					       onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>

					<input type="submit"
					       value="Register"
					       className="cursor-pointer bg-blue-500 hover:bg-blue-700 transition duration-300 w-full h-full mt-12 rounded-md"/>
				</form>
			</div>
		</div>
	)
}