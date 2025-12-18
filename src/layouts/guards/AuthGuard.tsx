import { useAuthContext } from "@/context/AuthContext";
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

  const ADMIN_BASE = import.meta.env.VITE_URL_ADMIN;
  const USER_BASE = import.meta.env.VITE_URL_USER;

  const isAdminRoute = location.pathname.startsWith(ADMIN_BASE);
  const isUserRoute = location.pathname.startsWith(USER_BASE);

  if (isUserRoute && role !== "user") {
    if (location.pathname !== ADMIN_BASE) {
      return <Navigate to={"/403"} replace />;
    }
  }

  if (isAdminRoute && role !== "admin") {
    if (location.pathname !== USER_BASE) {
      return <Navigate to={"/403"} replace />;
    }
  }

  return children;
}
