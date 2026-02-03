import {useMutation, useQueryClient} from "@tanstack/react-query";
import { register } from "../api/auth.ts";

export function useRegister() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			localStorage.setItem("accessToken", data.accessToken);
			queryClient.setQueryData(["me"], data.user);
		},
	});
}
