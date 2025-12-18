import GuestGuard from "@/layouts/guards/GuestGuard";
import AuthPage from "@/pages/auth";
import type { RouteObject } from "react-router-dom";

export const guestRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <GuestGuard>
        <AuthPage />
      </GuestGuard>
    ),
  },
];
