import { cn } from "@/lib/utils";
import type { LoadingStateProps } from "@/types/state";

const LoadingState = ({ children, fullPage = false , className = "" }: LoadingStateProps) => {
  if (fullPage) {
    return (
      <div className={cn("flex flex-col items-center justify-center min-h-screen p-4", className)}>
        <div className="w-full max-w-4xl space-y-4">{children}</div>
      </div>
    );
  }

  return <div className="space-y-4 p-4">{children}</div>;
};

export default LoadingState;
