import { ENV } from "@/env";
import { useAuthContext } from "@/hooks/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { user, userData, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!userData) return null;

  if (userData.is_blocked) {
    if (location.pathname !== "/blocked") {
      return <Navigate to="/blocked" replace />;
    }
  }

  const role = userData.role;
  const isAdminRoute = location.pathname.startsWith(ENV.URL_ADMIN);
  const isUserRoute = location.pathname.startsWith(ENV.URL_USER);

  if (isUserRoute && role !== "user") {
    return <Navigate to="/403" replace />;
  }

  if (isAdminRoute && role !== "admin") {
    return <Navigate to="/403" replace />;
  }

  return children;
}
