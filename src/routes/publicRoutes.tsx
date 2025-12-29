import MainLayout from "@/layouts/MainLayouts";
import AccountDeleted from "@/pages/account-status/AccountDeleted";
import AccountBlocked from "@/pages/account-status/Blocked";
import Forbidden from "@/pages/errors/403";
import ServerError from "@/pages/errors/500";
import LandingPage from "@/pages/landing/Index";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/403",
        element: <Forbidden />,
      },
      {
        path: "/500",
        element: <ServerError />,
      },
      {
        path: "/blocked",
        element: <AccountBlocked />,
      },
      {
        path: "/account-deleted",
        element: <AccountDeleted />,
      },
    ],
  },
];
