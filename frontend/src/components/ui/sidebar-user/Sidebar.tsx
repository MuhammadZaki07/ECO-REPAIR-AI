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
import { useAuthContext } from "@/context/AuthContext";
import { getUserAvatar } from "@/utils/getUserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AuthService } from "@/services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import menuJson from "@/data/user/MenuItemsSidebar.json";
import { IconBolt } from "@tabler/icons-react";

interface SidebarProps {
  onNewChat: () => void;
}

const iconMap: any = {
  home: Home,
  user2: User2,
  sparkle: Sparkle,
  shoppingBag: ShoppingBag,
  map: Map,
  replace: Replace,
  coins: Coins,
  settings: SettingsIcon,
  IconBolt: IconBolt,
};

interface SidebarProps {
  mini: boolean;
  setMini: (v: boolean) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}


export const Sidebar: React.FC<SidebarProps> = () => {
  const navigate = useNavigate();
  const [mini, setMini] = useState(false);
  const [chats, setChats] = useState([
    { id: 1, title: "Chat with Alice", active: true },
    { id: 2, title: "Project discussion", active: false },
    { id: 3, title: "Eco AI ideas", active: false },
  ]);

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

  return (
    <div
      className={`${
        mini ? "w-18" : "w-64"
      } dark:bg-black shadow shadow-sidebar-accent-foreground bg-neutral-200  text-[var(--sidebar-foreground)] rounded-2xl mr-2 flex flex-col overflow-hidden transition-all duration-300`}
    >
      <div
        className={`p-4 flex items-center ${
          mini ? "justify-center" : "justify-between"
        } relative group`}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center relative">
          {mini && (
            <Logo className="text-[var(--primary-foreground)] transition-opacity duration-200 group-hover:opacity-0" />
          )}

          {mini && (
            <SidebarOpen
              size={18}
              className="absolute dark:text-[var(--primary-foreground)] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => setMini(false)}
            />
          )}

          {!mini && (
            <Logo
              size={18}
              className="text-[var(--primary-foreground)] transition-opacity"
            />
          )}
        </div>

        {!mini && (
          <button
            onClick={() => setMini(true)}
            className="p-1 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
          >
            <SidebarClose size={20} className="transition-transform" />
          </button>
        )}
      </div>

      <div className="p-2 flex flex-col gap-2.5">
        {menuJson.map((item, i) => {
          const Icon = iconMap[item.icon];

          return (
            <SidebarItem
              key={i}
              icon={<Icon size={20} />}
              label={item.label}
              active={location.pathname.startsWith(item.path)}
              onClick={() => navigate(item.path)}
              mini={mini}
            />
          );
        })}
      </div>

      <div className="flex-1"></div>

      <div
        className={`${mini ? "py-2" : "px-2 py-3"} border-t border-white/10`}
      >
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 !py-7 cursor-pointer"
            >
              <Avatar
                style={{ backgroundColor: bgColor }}
                className="w-8 h-8 rounded-full flex justify-center items-center overflow-hidden"
              >
                {avatarUrl && avatarUrl.trim() !== "" ? (
                  <AvatarImage
                    src={avatarUrl || undefined}
                    alt={initial}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <AvatarFallback className="text-white font-semibold">
                    {initial}
                  </AvatarFallback>
                )}
              </Avatar>
              {!mini && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">
                    {user?.user_metadata?.name || initial}
                  </div>
                  <div className="text-xs text-gray-400">Free</div>
                </div>
              )}
              {!mini && <ChevronDown size={16} />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mx-2 my-4">
            <DropdownMenuItem>
              <User size={18} />
              <span>Upgrade plan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HelpCircle size={18} />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLogout()}>
              <LogOut size={18} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
