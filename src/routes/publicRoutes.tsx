import { MainLayout } from "@/layouts";
import LandingPage from "@/pages/landing/Index";
import { SparePartHubPage } from "@/pages/SparePart/SparePartHubPage";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  { path: "/sparepart", element: <SparePartHubPage /> },
];
