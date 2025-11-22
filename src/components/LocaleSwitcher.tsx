import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const flagMap: Record<string, string> = {
    id: "fi fi-id",
    en: "fi fi-us",
  };

  return (
    <div
      className="relative inline-block text-left"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center px-3 py-2 rounded-xl border bg-secondary dark:bg-secondary data-[state=on]:hover:bg-muted data-[state=on]:bg-transparent hover:bg-accent transition"
      >
        <span className={`w-5 h-5 rounded-sm ${flagMap[i18n.language]}`} />
      </button>

      {open && (
        <div className="absolute sm:-right-5 md:right-0 lg:right-0 mt-2 w-40 rounded-xl border bg-popover shadow-lg p-2 z-50">
          <button
            onClick={() => changeLanguage("id")}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg cursor-pointer hover:bg-accent text-sm"
          >
            <span className="fi fi-id w-5 h-5 rounded-sm" /> Indonesia
          </button>

          <button
            onClick={() => changeLanguage("en")}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg cursor-pointer hover:bg-accent text-sm"
          >
            <span className="fi fi-us w-5 h-5 rounded-sm" /> English
          </button>
        </div>
      )}
    </div>
  );
}
