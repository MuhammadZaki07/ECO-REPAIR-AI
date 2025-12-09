import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();

  const flagMap: Record<string, string> = {
    id: "fi fi-id",
    en: "fi fi-us",
  };

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer items-center px-3 py-2 rounded-xl border bg-secondary dark:bg-secondary hover:bg-accent transition">
          <span className={`w-5 h-5 rounded-sm ${flagMap[i18n.language]}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => changeLang("id")} className="cursor-pointer">
          <span className="fi fi-id w-5 h-5 rounded-sm mr-2" />
          Indonesia
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeLang("en")} className="cursor-pointer">
          <span className="fi fi-us w-5 h-5 rounded-sm mr-2" />
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
