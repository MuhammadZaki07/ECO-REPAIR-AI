import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import Header from "@/components/layout/header/dashboard-user/header";

function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const hideBreadcrumb = location.pathname.startsWith("/user/scan");

  return (
    <div className="flex h-screen p-3 bg-neutral-50 dark:bg-background overflow-hidden">
      <div
        className={`
          fixed inset-y-0 left-0 z-50
          md:static md:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300
        `}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <main className="flex flex-col flex-1 bg-neutral-50 dark:bg-background overflow-hidden">
        <Header
          hideBreadcrumb={hideBreadcrumb}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div
          className="flex flex-col flex-1 overflow-y-auto py-5 px-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default UserLayout;
