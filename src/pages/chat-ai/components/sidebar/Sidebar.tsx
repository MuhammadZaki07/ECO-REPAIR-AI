import React, { useState } from "react";
import {
  Plus,
  ChevronDown,
  Coins,
  SidebarClose,
  SidebarOpen,
  MessageCircle,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import Logo from "@/components/Logo";

interface SidebarProps {
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat }) => {
  const [gptExpanded, setGptExpanded] = useState(true);
  const [mini, setMini] = useState(false);

  // Dummy chat list
  const [chats, setChats] = useState([
    { id: 1, title: "Chat with Alice", active: true },
    { id: 2, title: "Project discussion", active: false },
    { id: 3, title: "Eco AI ideas", active: false },
  ]);

  return (
    <div
      className={`${
        mini ? "w-16" : "w-64"
      } dark:bg-black bg-neutral-200 border text-[var(--sidebar-foreground)] rounded-2xl mr-2 flex flex-col overflow-hidden transition-all duration-300`}
    >
      <div
        className={`p-4 flex items-center ${
          mini ? "justify-center" : "justify-between"
        } relative group cursor-pointer`}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center relative">
          {mini && (
            <Logo
              className="text-[var(--primary-foreground)] transition-opacity duration-200 group-hover:opacity-0"
            />
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

      <div className="p-2">
        <SidebarItem
          icon={<Plus size={18} />}
          label="New chat"
          onClick={onNewChat}
          mini={mini}
        />
        <SidebarItem icon={<Coins size={18} />} label="Eco coin" mini={mini} />
      </div>

      {!mini && (
        <div className="p-2">
          <span
            onClick={() => setGptExpanded(!gptExpanded)}
            className="px-3 py-2 flex justify-between cursor-pointer text-gray-400 dark:hover:text-neutral-500 hover:text-black w-full"
          >
            <span className="text-sm dark:text-muted text-neutral-700">Your Chats</span>
            <ChevronDown
              className={`transition-transform ${
                gptExpanded ? "rotate-0" : "-rotate-90"
              }`}
            />
          </span>

          {gptExpanded && (
            <div className="mt-1 space-y-1">
              {chats.map((chat) => (
                <SidebarItem
                  key={chat.id}
                  icon={<MessageCircle size={16} />}
                  label={chat.title}
                  active={chat.active}
                  mini={mini}
                  onClick={() =>
                    setChats(
                      chats.map((c) => ({ ...c, active: c.id === chat.id }))
                    )
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex-1"></div>

      <div className={`${mini ? "py-2" : "px-2 py-3"} border-t border-white/10`}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center gap-3 !py-7">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
                ZU
              </div>
              {!mini && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">ZAKI ULUMUDIN</div>
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
            <DropdownMenuItem>
              <User size={18} />
              <span>Personalization</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings size={18} />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HelpCircle size={18} />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut size={18} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
