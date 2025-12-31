import AuthGuard from "@/layouts/guards/AuthGuard";
import UserLayout from "@/layouts/UserLayout";
import Dashboard from "@/pages/admin/dashboard";
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
import Leaderboard from "@/pages/user/leaderboard";
import DonationDetailPage from "@/pages/user/Eco-coints/DonationDetailPage";
import { ENV } from "@/env";
import CategoryPage from "@/pages/admin/categories";
import LeaderboardPage from "@/pages/admin/leaderboards";
import UsersPage from "@/pages/admin/users";
import UsersAdmin from "@/pages/admin/users/admin-managment";
import ForumDashboard from "@/pages/admin/forums";
import GuidesPage from "@/pages/admin/guides";
import GuideDetailPage from "@/pages/admin/guides/detail-guide";
import { VouchersPage } from "@/pages/admin/Exchange-Hub/vouchers";

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
    path: `${ENV.URL_USER}`,
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
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "ecocoin/donation/:id", element: <DonationDetailPage /> },
    ],
  },

  {
    path: `${ENV.URL_ADMIN}`,
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "leaderboard", element: <LeaderboardPage /> },
      { path: "community", element: <LeaderboardPage /> },
      { path: "users-all", element: <UsersPage /> },
      { path: "admin-all", element: <UsersAdmin /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "forum-dashboard", element: <ForumDashboard /> },
      { path: "guides", element: <GuidesPage /> },
      { path: "guides/:id/:title", element: <GuideDetailPage /> },
      { path: "Exchange-Hub/vouchers", element: <VouchersPage /> },
    ],
  },
];
