import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar-user/Sidebar";
import Header from "@/components/layout/header/dashboard-user/header-user";

function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const hideBreadcrumb = location.pathname.startsWith("/user/scan");

  return (
    <div className="flex h-screen p-3 bg-neutral-100 dark:bg-black overflow-hidden">
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

      <main className="flex flex-col flex-1 bg-white dark:bg-black overflow-hidden">
        <Header
          hideBreadcrumb={hideBreadcrumb}
          scrolled={scrolled}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div
          className="flex flex-col flex-1 overflow-y-auto py-5 px-5"
          onScroll={(e) =>
            setScrolled(e.currentTarget.scrollTop > 8)
          }
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default UserLayout;
