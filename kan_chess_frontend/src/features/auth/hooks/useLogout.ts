import { useQueryClient } from "@tanstack/react-query";

export function useLogout() {
	const queryClient = useQueryClient();

	return () => {
		// remove auth token
		localStorage.removeItem("accessToken");

		// remove cached user
		queryClient.removeQueries({ queryKey: ["me"] });

		// OPTIONAL: clear everything
		// queryClient.clear();
	};
}
