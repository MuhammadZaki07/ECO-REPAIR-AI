import { Header } from "@/components/header/header";
import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      <Header />
      <main className="flex-1">{children ?? <Outlet />}</main>
    </div>
  );
}
