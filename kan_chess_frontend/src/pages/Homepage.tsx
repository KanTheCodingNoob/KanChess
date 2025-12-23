import {useNavigate} from "react-router";

export default function Homepage() {
	const navigate = useNavigate();

	return (
		<div className="w-screen p-8 text-center m-auto">
			<button onClick={() => navigate("/register")}
				className='w-32 h-10 rounded-4xl bg-neutral-900 transition duration-300 ease-in-out hover:bg-neutral-700 cursor-pointer'
			>
				Get started!
			</button>
		</div>
	)
}