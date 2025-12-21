import React from "react";

interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  mini?: boolean;
  badge?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  onClick,
  active,
  mini,
  badge,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors
        ${mini ? "justify-center" : "justify-between"}
        ${
          active
            ? "dark:bg-neutral-800 bg-neutral-200 text-neutral-700 dark:text-neutral-100"
            : "text-neutral-800 dark:text-neutral-100 hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]"
        }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!mini && <span>{label}</span>}
      </div>

      {!mini && badge && (
        <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold
           text-white border border-green-300">
          {badge}
        </span>
      )}
    </button>
  );
};
