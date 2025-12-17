import { cn } from "@/lib/utils";
import { BreadcrumbComponent } from "@/components/breadcrumb/BreadcrumbComponent";
import { SidebarOpen } from "lucide-react";

interface HeaderProps {
  hideBreadcrumb?: boolean;
  rightSlot?: React.ReactNode;
  onOpenSidebar?: () => void;
  scrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  hideBreadcrumb = false,
  rightSlot,
  onOpenSidebar,
  scrolled = false,
}) => {
  return (
    <header
      className={cn(
        "sticky top-2 z-40 w-full transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-white/70 dark:bg-black/60 border-b border-black/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between h-10 px-4">
        <div className="flex items-center gap-2">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            >
              <SidebarOpen size={20} />
            </button>
          )}

          {!hideBreadcrumb && <BreadcrumbComponent />}
        </div>

        <div className="flex items-center gap-3">
          {rightSlot}
        </div>
      </div>
    </header>
  );
};

export default Header;
