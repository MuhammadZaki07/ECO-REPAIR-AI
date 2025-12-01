import GuestGuard from "@/guards/GuestGuard";
import AuthLayout from "@/layouts/AuthLayouts";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import type { RouteObject } from "react-router-dom";

export const guestRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
];
