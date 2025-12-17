import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function LoginButton() {
  return (
    <Link to="/login">
      <Button variant="outline" size="sm" className="cursor-pointer">
        <LogIn/>
      </Button>
    </Link>
  );
}
