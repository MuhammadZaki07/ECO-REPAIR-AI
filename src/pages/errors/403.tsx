import ForbiddenSVG from "@/assets/svg/403.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <img
          src={ForbiddenSVG}
          alt="403"
          className="w-full max-w-lg mx-auto mb-6"
        />

        <h1 className="text-4xl font-bold mb-3">403</h1>
        <p className="text-muted-foreground mb-6">
          You do not have access to this page.
        </p>

        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      </div>
    </div>
  );
}
