import { ENV } from "@/env";
import { useAuthContext } from "@/hooks/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function GuestGuard({ children }: Props) {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  return user ? <Navigate to={`${ENV.URL_USER}/dashboard`} replace /> : children;
}
