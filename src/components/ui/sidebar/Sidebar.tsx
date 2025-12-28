import { useState } from "react";
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
  HelpCircle,
  LogOut,
  Layers,
  MessageSquare,
  List,
  UserPlus,
  BookOpen,
  Ticket,
  PackageIcon,
  HandCoins,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { AuthService } from "@/services/AuthService";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SidebarItem } from "../sidebar/SidebarItem";
import MenuSidebarUser from "@/data/menu-items/MenuSidebarUser.json";
import MenuSidebarAdmin from "@/data/menu-items/MenuSidebarAdmin.json";
import { IconBolt, IconExchange, IconTools } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { ENV } from "@/env";
import type { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { SidebarGroup, SidebarGroupLabel } from "../sidebar";
import { getInitial } from "@/utils/getInitial";

type MenuItem = {
  label: string;
  icon: string;
  path: string;
  badge?: string;
  children?: MenuItem[];
};

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  IconBolt,
  users: Users,
  coins: Coins,
  user2: User2,
  sparkle: Sparkle,
  shoppingBag: ShoppingBag,
  map: Map,
  tools: IconTools,
  list: List,
  userPlus: UserPlus,
  layers: Layers,
  replace: Replace,
  settings: SettingsIcon,
  clipboard: Clipboard,
  Questions: FileQuestion,
  trophy: Trophy,
  messagesSquare: MessageSquare,
  bookOpen: BookOpen,
  ExchangeHub: IconExchange,
  voucher: Ticket,
  merchandise: PackageIcon,
  donation: HandCoins,
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mini, setMini] = useState(false);

  const { user, userData } = useAuthContext();
  if (!userData) return null;

  const isAdmin = userData.role === "admin";
  const basePath = isAdmin ? ENV.URL_ADMIN : ENV.URL_USER;
  const menuItems: MenuItem[] = isAdmin ? MenuSidebarAdmin : MenuSidebarUser;

  const isVerified =
    user?.identities?.[0]?.identity_data?.email_verified === true;

  const handleLogout = async () => {
    await AuthService.logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`${
        mini ? "w-18" : "w-64"
      } mr-2 flex flex-col justify-between transition-all duration-300 bg-background h-full border dark:border-white/10 border-neutral-200 rounded-2xl`}
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
                className="absolute opacity-0 group-hover:opacity-100 cursor-pointer"
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
            <SidebarClose size={20} />
          </button>
        )}
      </div>

      <nav className="p-2 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon];
          if (!Icon) return null;

          const isActive = location.pathname.startsWith(
            `${basePath}/${item.path}`
          );
          if (item.children && item.children.length > 0) {
            return (
              <Collapsible
                key={item.path}
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarGroup className="p-0 m-0">
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="cursor-pointer group relative flex items-center w-full">
                      <div className="flex items-center gap-3 w-full relative dark:text-white">
                        {mini ? (
                          <>
                            <Icon
                              size={20}
                              className="group-hover:opacity-0 transition-opacity duration-300 ease-in-out"
                            />
                            <ChevronDown
                              size={16}
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </>
                        ) : (
                          <Icon size={20} />
                        )}

                        {!mini && <span>{item.label}</span>}

                        {!mini && (
                          <ChevronDown
                            size={16}
                            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                          />
                        )}
                      </div>
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent className="flex flex-col ml-4 gap-2 mt-2">
                    {item.children.map((child) => {
                      const ChildIcon = iconMap[child.icon];
                      return (
                        <SidebarItem
                          key={child.path}
                          icon={ChildIcon && <ChildIcon size={16} />}
                          label={child.label}
                          mini={mini}
                          active={location.pathname.startsWith(
                            `${basePath}/${child.path}`
                          )}
                          onClick={() => navigate(`${basePath}/${child.path}`)}
                        />
                      );
                    })}
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          }

          return (
            <SidebarItem
              key={item.path}
              icon={<Icon size={20} />}
              label={item.label}
              mini={mini}
              onClick={() => navigate(`${basePath}/${item.path}`)}
              active={location.pathname.startsWith(`${basePath}/${item.path}`)}
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
              <Avatar className="w-8 h-8">
                {userData.avatar_url ? (
                  <AvatarImage
                    src={userData.avatar_url || user?.user_metadata?.avatar_url}
                    alt={userData?.username?.[0]?.toUpperCase() || "U"}
                  />
                ) : (
                  <AvatarFallback className="font-semibold">
                    {getInitial(userData?.username)}
                  </AvatarFallback>
                )}
              </Avatar>

              {!mini && (
                <>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">
                      {userData?.username}
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

          <DropdownMenuContent align="start" sideOffset={8} className="w-64">
            <Link to="/">
              <DropdownMenuItem>
                <SkipBack size={18} /> Landing Page
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />

            <Link to="/help-page">
              <DropdownMenuItem>
                <HelpCircle size={18} /> Help
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
