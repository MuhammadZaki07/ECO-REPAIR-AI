import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  fullPage?: boolean;
  className?: string;
};

const ContainerLoading = ({
  children,
  fullPage = false,
  className = "",
}: ContainerProps) => {
  if (fullPage) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center min-h-screen p-4",
          className
        )}
      >
        <div className="w-full max-w-4xl space-y-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4 p-4", className)}>
      {children}
    </div>
  );
};

export default ContainerLoading;
