import {BACKEND_HTTP} from "../../../config/backend.ts";

type LoginPayload = {
	username: string;
	password: string
};

type RegisterPayload = {
	username: string;
	email: string;
	password: string;
}

type User = {
	id: number;
	username: string;
};

type LoginResponse = {
	accessToken: string;
	user: User;
};

type RegisterResponse = {
	accessToken: string;
	user: User;
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
		throw new Error("Invalid credentials");
	}

	const data: LoginResponse = await res.json();
	return data;
}

export async function register(payload: RegisterPayload): Promise<LoginResponse> {
	const res = await fetch(`${BACKEND_HTTP}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.message || "Registration failed");
	}

	const data: RegisterResponse = await res.json();
	return data;
}
