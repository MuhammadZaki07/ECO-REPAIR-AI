import { useEffect, useState } from "react";
import { BreadcrumbComponent } from "@/components/breadcrumb/BreadcrumbComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/ui/sidebar/app-sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 5);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        <div className="hidden md:flex">
          <DashboardSidebar />
        </div>
        <div className="md:hidden">
          <DashboardSidebar />
        </div>

        <main className="flex-1 w-full bg-sidebar md:pl-5 pl-0 transition-all">
          <div
            className={`min-h-screen dark:bg-black/50 bg-neutral-100 transition-all duration-300
              ${isScrolled ? "rounded-none" : "rounded-tl-[3rem]"}
            `}
          >
            <div className="flex items-center gap-3 md:hidden px-6 pt-6 pb-2">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Menu</h1>
            </div>

            <div className="px-6 sm:px-10 pt-8 pb-4">
              <BreadcrumbComponent />
            </div>

            <div className="px-6 sm:px-10 pb-10 overflow-x-auto">
              <Outlet />
            </div>
          </div>
        </main>

      </div>
    </SidebarProvider>
  );
}
