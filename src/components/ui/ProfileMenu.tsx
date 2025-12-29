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
import { useAuthContext } from "@/hooks/context/AuthContext";
import { getInitial } from "@/utils/getInitial";
import { useAuth } from "@/hooks/useAuth";

export function ProfileMenu() {
  const navigate = useNavigate();
  const { user, userData } = useAuthContext();
  const { logout } = useAuth();
  if (!userData) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer p-0.5">
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
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 mt-3">
        <Link
          to={userData?.role == "user" ? "/user/dashboard" : "/admin/dashboard"}
        >
          <DropdownMenuItem className="cursor-pointer">
            Dashboard
          </DropdownMenuItem>
        </Link>

        <Link to={"/user/profile"}>
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
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
