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

  const role = userData.role;

  const isAdminRoute = location.pathname.startsWith(ENV.URL_ADMIN);
  const isUserRoute = location.pathname.startsWith(ENV.URL_USER);

  if (isUserRoute && role !== "user") {
    if (location.pathname !== ENV.URL_ADMIN) {
      return <Navigate to={"/403"} replace />;
    }
  }

  if (isAdminRoute && role !== "admin") {
    if (location.pathname !== ENV.URL_USER) {
      return <Navigate to={"/403"} replace />;
    }
  }

  return children;
}
