import React, { useState } from "react";
import {
  ChevronDown,
  Coins,
  SidebarClose,
  SidebarOpen,
  Home,
  User2,
  SettingsIcon,
  Sparkle,
  Map,
  Replace,
  ShoppingBag,
  Users,
  Clipboard,
  FileQuestion,
  SkipBack,
  Trophy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, HelpCircle, LogOut } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { getUserAvatar } from "@/utils/getUserAvatar";
import { AuthService } from "@/services/AuthService";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import menuJson from "@/data/menu-items/MenuItemsSidebar.json";
import { IconBolt, IconTools } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { ENV } from "@/env";

const iconMap: Record<string, any> = {
  home: Home,
  IconBolt,
  tool: IconTools,
  users: Users,
  coins: Coins,
  user2: User2,
  sparkle: Sparkle,
  shoppingBag: ShoppingBag,
  map: Map,
  tools: IconTools,
  replace: Replace,
  settings: SettingsIcon,
  clipboard: Clipboard,
  Questions: FileQuestion,
  tropy:Trophy
};

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mini, setMini] = useState(false);

  const { user } = useAuthContext();
  const { avatarUrl, initial, bgColor } = getUserAvatar(user);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.error("Logout failed:", err.message);
    }
  };

  const isVerified =
    user?.identities?.[0]?.identity_data?.email_verified === true;

  return (
    <aside
      className={`${
        mini ? "w-18" : "w-64"
      } mr-2 flex flex-col justify-between transition-all duration-300 bg-background text-white h-full border dark:border-white/10 border-neutral-200 rounded-2xl`}
    >
      <div
        className={`p-4 flex items-center ${
          mini ? "justify-center" : "justify-between"
        } group`}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {mini ? (
            <>
              <Logo className="group-hover:opacity-0 transition-opacity" />
              <SidebarOpen
                size={18}
                className="absolute opacity-0 group-hover:opacity-100 cursor-pointer dark:text-white text-neutral-900"
                onClick={() => setMini(false)}
              />
            </>
          ) : (
            <Logo size={18} />
          )}
        </div>

        {!mini && (
          <button
            onClick={() => setMini(true)}
            className="p-1 rounded-lg hover:bg-white/10 transition"
          >
            <SidebarClose
              size={20}
              className="dark:text-white text-neutral-900"
            />
          </button>
        )}
      </div>

      <nav className="p-2 flex flex-col gap-2">
        {menuJson.map((item, i) => {
          const Icon = iconMap[item.icon];
          if (!Icon) return null;

          return (
            <SidebarItem
              key={i}
              icon={<Icon size={20} />}
              label={item.label}
              badge={item.badge}
              active={location.pathname.startsWith(`${ENV.URL_USER}/${item.path}`)}
              onClick={() => navigate(`${ENV.URL_USER}/${item.path}`)}
              mini={mini}
            />
          );
        })}
      </nav>

      <div className="flex-1" />

      <div
        className={`${mini ? "py-2" : "px-2 py-3"} border-t border-white/10`}
      >
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 !py-7"
            >
              <Avatar
                style={{ backgroundColor: bgColor }}
                className="w-8 h-8 rounded-full overflow-hidden"
              >
                {avatarUrl ? (
                  <AvatarImage loading="lazy" src={avatarUrl} alt={initial} />
                ) : (
                  <AvatarFallback className="dark:text-white text-neutral-900 font-semibold">
                    {initial}
                  </AvatarFallback>
                )}
              </Avatar>

              {!mini && (
                <>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium  dark:text-white text-neutral-900">
                      {user?.user_metadata?.name || initial}
                    </div>
                    <div className="text-xs text-gray-400">
                      {isVerified ? "Active" : "Not verified"}
                    </div>
                  </div>
                  <ChevronDown size={16} />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            align="start"
            sideOffset={8}
            className="w-64"
          >
              <Link to={"/"}>
            <DropdownMenuItem>
              <SkipBack size={18} /> Go to Landing Page
            </DropdownMenuItem>
              </Link>
            <DropdownMenuSeparator />
            <Link to={"/help-page"}>
              <DropdownMenuItem>
                <HelpCircle size={18} /> Help
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut size={18} /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
