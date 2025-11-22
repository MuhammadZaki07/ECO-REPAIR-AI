import * as React from "react";
import { Avatar } from "./Avatar";
import { useTheme } from "next-themes";

export function ProfileMenu() {
  const { theme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const bg = `bg-[var(--card)]`;
  const border = `border-[var(--border)]`;
  const text = `text-[var(--card-foreground)]`;
  const hover = `hover:bg-[var(--accent)]/20`;

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setOpen(!open)}
        className={`cursor-pointer ${bg} border ${border} rounded-full p-0.5`}
      >
        <Avatar src="/sawah.jpg" alt="User Name" size={40} />
      </div>

      {open && (
        <ul className={`absolute right-0 mt-2 w-40 ${bg} ${border} border rounded shadow-lg z-50`}>
          {["Dashboard", "Profile", "Logout"].map((item) => (
            <li
              key={item}
              className={`px-4 py-2 ${hover} cursor-pointer ${text} transition-colors`}
              onClick={() => setOpen(false)} // Klik item menutup menu
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
