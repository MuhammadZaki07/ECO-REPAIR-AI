import MainLayout from "@/layouts/MainLayouts";
import LandingPage from "@/pages/landing/Index";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
];
