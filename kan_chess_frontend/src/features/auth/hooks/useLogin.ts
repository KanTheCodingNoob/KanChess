import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login} from "../api/auth.ts";

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: login,

		onSuccess: (data) => {
			// Example: store token (if using JWT)
			localStorage.setItem("accessToken", data.accessToken);

			// Cache the user
			queryClient.setQueryData(["me"], data.user);
		},
	});
}
