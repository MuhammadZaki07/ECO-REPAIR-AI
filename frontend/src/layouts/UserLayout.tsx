import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar-user/Sidebar";
import { BreadcrumbComponent } from "@/components/breadcrumb/BreadcrumbComponent";

function UserLayout() {
  const [sidebarOpen] = useState(true);
  const location = useLocation();
  const hideBreadcrumb = location.pathname.startsWith("/user/scan");

  return (
    <div className="flex h-screen p-3 bg-neutral-100 dark:bg-black overflow-hidden">
      {sidebarOpen && <Sidebar />}

      <main
        className="flex flex-col flex-1 rounded-2xl shadow border dark:bg-black bg-white p-4 sm:p-6 lg:p-8 overflow-hidden"
      >
        {!hideBreadcrumb && <BreadcrumbComponent />}
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
