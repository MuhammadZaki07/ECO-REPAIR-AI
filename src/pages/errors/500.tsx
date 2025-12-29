import ServerErrorSVG from "@/assets/svg/500.svg";
import { Button } from "@/components/ui/button";

export default function ServerError() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <img
          src={ServerErrorSVG}
          alt="500"
          className="w-full max-w-xs mx-auto mb-6"
        />

        <h1 className="text-4xl font-bold mb-3">500</h1>
        <p className="text-muted-foreground mb-6">
          Something went wrong on our end. Please try again later.
        </p>

        <Button onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </div>
    </div>
  );
}
