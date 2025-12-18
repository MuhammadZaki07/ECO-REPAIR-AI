import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
import { guestRoutes } from "./guestRoutes";
import NotFound from "@/pages/errors/404";

export default function AppRoutes() {
  return useRoutes([
    ...publicRoutes,
    ...protectedRoutes,
    ...guestRoutes,
    { path: "*", element: <NotFound /> },
  ]);
}
