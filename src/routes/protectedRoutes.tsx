import AuthGuard from "@/layouts/guards/AuthGuard";
import UserLayout from "@/layouts/UserLayout";
import Dashboard from "@/pages/admin/Dashboard";
import AuthCallback from "@/pages/auth/callback";
import ScanPage from "../pages/user/chat-ai/ScanPage";
import type { RouteObject } from "react-router-dom";
import ProfilePage from "@/pages/user/Profile";
import DashboardForums from "@/pages/user/forums";
import EcoCoints from "@/pages/user/Eco-coints";
import DiagnosisHistoryPage from "@/pages/user/Diagnosis-history";
import DiagnosisDetailPage from "@/pages/user/Diagnosis-history/detail-diagnosa";
import ForumDetailPage from "@/pages/user/forums/detail-forums";
import UserDashboard from "@/pages/user/dashboard";
import AdminLayout from "@/layouts/AdminLayouts";

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
      { index: true, element: <UserDashboard /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "scan", element: <ScanPage /> },
      { path: "history", element: <DiagnosisHistoryPage /> },
      { path: "history/:id", element: <DiagnosisDetailPage /> },
      { path: "forums", element: <DashboardForums /> },
      { path: "forums/:id", element: <ForumDetailPage /> },
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
