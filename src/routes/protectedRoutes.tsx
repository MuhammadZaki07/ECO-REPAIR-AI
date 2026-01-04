import { lazy, Suspense, type JSX } from "react";
import type { RouteObject } from "react-router-dom";

import AuthGuard from "@/layouts/guards/AuthGuard";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayouts";
import { ENV } from "@/env";
import GlobalLoading from "@/components/ui/GlobalLoading";

const withSuspense = (el: JSX.Element) => (
  <Suspense fallback={<GlobalLoading/>}>{el}</Suspense>
);

const AuthCallback = lazy(() => import("@/pages/auth/callback"));

const UserDashboard = lazy(() => import("@/pages/user/dashboard"));
const ScanPage = lazy(() => import("@/pages/user/chat-ai/ScanPage"));
const DiagnosisHistoryPage = lazy(
  () => import("@/pages/user/Diagnosis-history")
);
const DiagnosisDetailPage = lazy(
  () => import("@/pages/user/Diagnosis-history/detail-diagnosa")
);
const DashboardForums = lazy(() => import("@/pages/user/forums"));
const ForumDetailPage = lazy(() => import("@/pages/user/forums/detail-forums"));
const EcoCoints = lazy(() => import("@/pages/user/Eco-coints"));
const DonationDetailPage = lazy(
  () => import("@/pages/user/Eco-coints/DonationDetailPage")
);
const ProfilePage = lazy(() => import("@/pages/user/Profile"));
const Leaderboard = lazy(() => import("@/pages/user/leaderboard"));

const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const CategoryPage = lazy(() => import("@/pages/admin/categories"));
const LeaderboardPage = lazy(() => import("@/pages/admin/leaderboards"));
const UsersPage = lazy(() => import("@/pages/admin/users"));
const UsersAdmin = lazy(() => import("@/pages/admin/users/admin-managment"));
const ForumDashboard = lazy(() => import("@/pages/admin/forums"));
const GuidesPage = lazy(() => import("@/pages/admin/guides"));
const GuideDetailPage = lazy(() => import("@/pages/admin/guides/detail-guide"));
const VouchersPage = lazy(() =>
  import("@/pages/admin/Exchange-Hub/vouchers").then((m) => ({
    default: m.VouchersPage,
  }))
);

const MerchandisePage = lazy(
  () => import("@/pages/admin/Exchange-Hub/merchandise")
);
const DonationPage = lazy(() => import("@/pages/admin/Exchange-Hub/donations"));

export const protectedRoutes: RouteObject[] = [
  {
    path: "/auth/callback",
    element: withSuspense(
      <AuthGuard>
        <AuthCallback />
      </AuthGuard>
    ),
  },

  {
    path: ENV.URL_USER,
    element: (
      <AuthGuard>
        <UserLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: withSuspense(<UserDashboard />) },
      { path: "dashboard", element: withSuspense(<UserDashboard />) },
      { path: "scan", element: withSuspense(<ScanPage />) },
      { path: "history", element: withSuspense(<DiagnosisHistoryPage />) },
      {
        path: "history/:id",
        element: withSuspense(<DiagnosisDetailPage />),
      },
      { path: "forums", element: withSuspense(<DashboardForums />) },
      {
        path: "forums/:id",
        element: withSuspense(<ForumDetailPage />),
      },
      { path: "ecocoin", element: withSuspense(<EcoCoints />) },
      {
        path: "ecocoin/donation/:id",
        element: withSuspense(<DonationDetailPage />),
      },
      { path: "profile", element: withSuspense(<ProfilePage />) },
      { path: "leaderboard", element: withSuspense(<Leaderboard />) },
    ],
  },

  {
    path: ENV.URL_ADMIN,
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: withSuspense(<AdminDashboard />) },
      { path: "dashboard", element: withSuspense(<AdminDashboard />) },
      { path: "categories", element: withSuspense(<CategoryPage />) },
      { path: "leaderboard", element: withSuspense(<LeaderboardPage />) },
      { path: "community", element: withSuspense(<LeaderboardPage />) },
      { path: "users-all", element: withSuspense(<UsersPage />) },
      { path: "admin-all", element: withSuspense(<UsersAdmin />) },
      { path: "profile", element: withSuspense(<ProfilePage />) },
      {
        path: "forum-dashboard",
        element: withSuspense(<ForumDashboard />),
      },
      { path: "guides", element: withSuspense(<GuidesPage />) },
      {
        path: "guides/:id/:title",
        element: withSuspense(<GuideDetailPage />),
      },
      {
        path: "Exchange-Hub/vouchers",
        element: withSuspense(<VouchersPage />),
      },
      {
        path: "Exchange-Hub/merchindase",
        element: withSuspense(<MerchandisePage />),
      },
      {
        path: "Exchange-Hub/donations",
        element: withSuspense(<DonationPage />),
      },
    ],
  },
];
