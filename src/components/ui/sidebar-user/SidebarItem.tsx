import React from 'react';

interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  mini?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick, active, mini }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex cursor-pointer ${mini ? "justify-center" : "justify-normal"} items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors
        ${active ? 'dark:bg-neutral-800 bg-neutral-600 text-[var(--sidebar-primary-foreground)]' : 'hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]'}`}
    >
      {icon}
      {!mini && <span>{label}</span>}
    </button>
  );
};
