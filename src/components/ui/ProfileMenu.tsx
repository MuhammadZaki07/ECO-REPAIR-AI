import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UserJPG from "@/assets/images/image.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

export function ProfileMenu() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer rounded-full p-0.5">
          <Avatar>
            <AvatarImage src={UserJPG} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 mt-3">
        <Link to={"/admin/dashboard"}>
          <DropdownMenuItem>
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link to={"/admin/profile"}>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
