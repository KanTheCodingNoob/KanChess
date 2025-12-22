export type MessageContent = {
	type: string,
	move?: {
		from: string,
		to: string
	},
	color?: "white" | "black" | undefined,
	winner?: "white" | "black"
}