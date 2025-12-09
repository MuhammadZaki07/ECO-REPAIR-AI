import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <Link to="/login">
      <Button variant="outline" size="sm" className="cursor-pointer">
        Sign In
      </Button>
    </Link>
  );
}
