import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface AdminLayoutProps {
  children?: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="flex">
        <aside className="w-64 bg-card p-4">Sidebar Admin</aside>
        <main className="flex-1 p-4">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}
