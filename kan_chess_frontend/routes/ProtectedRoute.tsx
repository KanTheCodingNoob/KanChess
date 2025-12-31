import { Navigate } from "react-router";
import { useMe } from "../src/features/auth/hooks/useMe";
import type {JSX} from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
	const { data: user, isLoading } = useMe();

	if (isLoading) return null;

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
