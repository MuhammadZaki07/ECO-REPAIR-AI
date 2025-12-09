import AuthGuard from "@/guards/AuthGuard";
import { AdminLayout } from "@/layouts";
import UserLayout from "@/layouts/UserLayout";
import Dashboard from "@/pages/admin/Dashboard";
import AuthCallback from "@/pages/auth/callback";
import ScanPage from "../pages/user/chat-ai/ScanPage";
import type { RouteObject } from "react-router-dom";
import MainDahsboard from "@/pages/user/Dashboard";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/auth/callback",
    element: (
      <AuthGuard>
        <AuthCallback />
      </AuthGuard>
    ),
  },

  {
    path: `${import.meta.env.VITE_URL_USER}`,
    element: (
      <AuthGuard>
        <UserLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <MainDahsboard /> },
      { path: "dashboard", element: <MainDahsboard /> },
      { path: "scan", element: <ScanPage /> },
    ],
  },

  {
    path: `${import.meta.env.VITE_URL_ADMIN}`,
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
];
