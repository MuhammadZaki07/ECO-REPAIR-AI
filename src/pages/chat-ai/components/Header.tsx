import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <header className="bg-[var(--card)] border-b border-[var(--border)] px-4 py-3 flex items-center gap-3">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className="flex items-center gap-3">
        <div className="text-xl font-semibold text-[var(--foreground)]">
          EcoRepair AI
        </div>
      </div>
    </header>
  );
};
