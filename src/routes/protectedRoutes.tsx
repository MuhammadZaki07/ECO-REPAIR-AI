import AuthGuard from "@/guards/AuthGuard";
import { AdminLayout } from "@/layouts";
import Dashboard from "@/pages/admin/Dashboard";
import AuthCallback from "@/pages/auth/callback";
import { ScanPage } from "@/pages/scan/ScanPage";
import type { RouteObject } from "react-router-dom";

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
    path: "/scan",
    element: (
      <AuthGuard>
        <ScanPage />
      </AuthGuard>
    ),
  },
  {
    path: "/admin",
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
