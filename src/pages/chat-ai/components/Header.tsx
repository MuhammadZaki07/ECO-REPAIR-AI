import { BreadcrumbComponent } from "@/components/breadcrumb/BreadcrumbComponent";
import { ModeToggle } from "@/components/layout/header/theme-switch";
import { Archive, Download, Share } from "lucide-react";

export const Header = () => {
  return (
    <header className="px-4 py-3 flex justify-between items-center">
      
      <div className="flex flex-col gap-1">
        <BreadcrumbComponent />
        <div className="text-2xl uppercase font-semibold text-[var(--foreground)]">
          Eco Repair AI
        </div>
      </div>

      <div className="flex items-center">
        <button className="flex items-center font-normal cursor-pointer gap-2 hover:text-[var(--primary)] transition-colors">
          <Share size={18} />
          <span>Share</span>
        </button>

        <button className="flex items-center font-normal cursor-pointer gap-2 hover:text-[var(--primary)] transition-colors">
          <Archive size={18} />
          <span>Archive</span>
        </button>

        <button className="flex items-center font-normal cursor-pointer gap-2 hover:text-[var(--primary)] transition-colors">
          <Download size={18} />
          <span>Export</span>
        </button>
         <ModeToggle />
      </div>
      
    </header>
  );
};
