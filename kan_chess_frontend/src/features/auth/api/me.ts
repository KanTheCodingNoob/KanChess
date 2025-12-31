import {BACKEND_HTTP} from "../../../config/backend.ts";

export async function fetchMe() {
	const res = await fetch(`${BACKEND_HTTP}/auth/me`, {
		credentials: "include",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	});

	if (!res.ok) {
		throw new Error("Not authenticated");
	}

	return res.json();
}
