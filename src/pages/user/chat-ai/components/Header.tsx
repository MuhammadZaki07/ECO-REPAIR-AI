import { ModeToggle } from "@/components/layout/header/theme-switch";
import { Download, ListRestart, Share } from "lucide-react";

export const Header = () => {
  return (
    <header className="px-4 pb-5 flex justify-end items-center">
      <div className="flex items-center gap-3">
        <button className="flex items-center font-normal cursor-pointer gap-2 hover:text-[var(--primary)] transition-colors">
          <Share size={18} />
          <span>Share</span>
        </button>
        <button className="flex items-center font-normal cursor-pointer gap-2 hover:text-[var(--primary)] transition-colors">
          <ListRestart size={18} />
          <span>Reset</span>
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
