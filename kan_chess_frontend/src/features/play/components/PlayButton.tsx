type ButtonInfo = {
	label: string;
	onClick?: () => void;
};

export default function PlayButton({label, onClick}: ButtonInfo) {
	return (
		<button onClick={()=> onClick?.()}
			className='w-full lg:w-96 h-20 rounded-md bg-neutral-900 transition duration-300 ease-in-out hover:bg-neutral-700 cursor-pointer'
		>
			{label}
		</button>
	)
}