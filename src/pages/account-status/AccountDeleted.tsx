import BlockedSVG from "@/assets/svg/blocked.svg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AccountDeleted() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <img
          src={BlockedSVG}
          alt="Account Deleted"
          className="w-62 max-w-xs mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold mb-3">Account Deleted</h1>

        <p className="text-muted-foreground mb-6">
          Your account has been permanently removed from our system.
          <br />
          <br />
          If you believe this was a mistake or need further assistance, please
          contact our support team at{" "}
          <span className="font-medium text-foreground">
            EcoRepairTeamSupport@eco.com
          </span>
          .
        </p>

        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
