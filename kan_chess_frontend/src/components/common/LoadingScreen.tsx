export default function LoadingScreen() {
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-neutral-900 text-white">
			<div className="flex flex-col items-center gap-4">
				<div className="animate-spin h-12 w-12 rounded-full border-4 border-neutral-600 border-t-white" />
				<p className="text-lg">Connecting to game...</p>
			</div>
		</div>
	);
}
