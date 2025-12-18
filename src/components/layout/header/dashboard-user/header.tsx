import { cn } from "@/lib/utils";
import { BreadcrumbComponent } from "@/components/breadcrumb/BreadcrumbComponent";
import { SidebarOpen, Bell, Settings, Search } from "lucide-react";
import { ModeToggle } from "../theme-switch";
import { ProfileMenu } from "@/components/ui/ProfileMenu";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  hideBreadcrumb?: boolean;
  onOpenSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ hideBreadcrumb = false, onOpenSidebar }) => {
  return (
    <header
      className={cn(
        "sticky top-2 z-40 w-full transition-all duration-300 bg-white/80 dark:bg-background " +
        "backdrop-blur-xl border border-gray-200 dark:border-neutral-800 rounded-2xl " + 
        `${hideBreadcrumb ? "hidden" : "block"}`,
      )}
    >
      <div className="flex items-center justify-between h-16 px-5">
        <div className="flex items-center gap-3">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="md:hidden p-2 rounded-lg transition"
            >
              <SidebarOpen size={20} />
            </button>
          )}

          {!hideBreadcrumb && <BreadcrumbComponent />}
        </div>

        <div className="flex items-center gap-3">
          <Button variant={"ghost"} className="relative">
            <Bell size={18} />
            <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500 ring-1 ring-white" />
          </Button>
          <ModeToggle />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
