import { useAuthContext } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return null;

  return user
    ? children
    : <Navigate to="/auth/login" replace state={{ from: location }} />;
}
