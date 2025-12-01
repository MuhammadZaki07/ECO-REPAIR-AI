import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import { getUserAvatar } from "@/utils/getUserAvatar";
import { useAuthContext } from "@/context/AuthContext";
import { AuthService } from "@/services/auth/AuthService";

export function ProfileMenu() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { avatarUrl, initial, bgColor } = getUserAvatar(user);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate("/auth/login", { replace: true });
    } catch (err: any) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer p-0.5">
          <Avatar style={{ backgroundColor: bgColor }} className="w-8 h-8 rounded-full flex justify-center items-center">
            <AvatarImage src={avatarUrl || undefined} alt="avatar" />
            <AvatarFallback
              className="text-white font-semibold"
            >
              {initial}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 mt-3">
        <Link to="/admin/dashboard">
          <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
        </Link>

        <Link to="/admin/profile">
          <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-500 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
