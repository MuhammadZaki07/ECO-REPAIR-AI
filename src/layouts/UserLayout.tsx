import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar-user/Sidebar";
import { BreadcrumbComponent } from "@/components/breadcrumb/BreadcrumbComponent";

function UserLayout() {
  const [sidebarOpen] = useState(true);

  return (
    <div className="flex h-screen p-3 bg-neutral-100 dark:bg-black overflow-hidden">
      {sidebarOpen && <Sidebar />}

      <main className="flex flex-col flex-1 dark:bg-black rounded-2xl shadow border p-8 overflow-hidden">
        <BreadcrumbComponent />
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
