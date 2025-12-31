import {BACKEND_HTTP} from "../../../config/backend.ts";

type LoginPayload = {
	username: string;
	password: string;
};

type LoginResponse = {
	accessToken: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const res = await fetch(`${BACKEND_HTTP}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // important if using cookies/sessions
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		console.log("Fyck you");
		throw new Error("Invalid credentials");
	}

	const data = await res.json();
	console.log(data);

	return data;
}
