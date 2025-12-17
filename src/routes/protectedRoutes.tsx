import AuthGuard from "@/guards/AuthGuard";
import { AdminLayout } from "@/layouts";
import UserLayout from "@/layouts/UserLayout";
import Dashboard from "@/pages/admin/Dashboard";
import AuthCallback from "@/pages/auth/callback";
import ScanPage from "../pages/user/chat-ai/ScanPage";
import type { RouteObject } from "react-router-dom";
import ProfilePage from "@/pages/user/Profile";
import DashboardUser from "@/pages/user/dashboard";
import CommunityForums from "@/pages/user/comunity";
import EcoCoints from "@/pages/user/Eco-coints";
import DiagnosisHistoryPage from "@/pages/user/Diagnosis-history";
import DiagnosisDetailPage from "@/pages/user/Diagnosis-history/detail-diagnosa";

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
      { index: true, element: <DashboardUser /> },
      { path: "dashboard", element: <DashboardUser /> },
      { path: "scan", element: <ScanPage /> },
      { path: "history", element: <DiagnosisHistoryPage /> },
      { path: "history/:id", element: <DiagnosisDetailPage /> },
      { path: "community", element: <CommunityForums /> },
      { path: "ecocoin", element: <EcoCoints /> },
      { path: "profile", element: <ProfilePage /> },
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
