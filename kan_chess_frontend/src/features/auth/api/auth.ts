import {useQueryClient} from "@tanstack/react-query";

type LoginPayload = {
	username: string;
	password: string;
};

type LoginResponse = {
	user: {
		id: number;
		username: string;
	};
	accessToken: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const res = await fetch("/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // important if using cookies/sessions
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		throw new Error("Invalid credentials");
	}

	return res.json();
}
