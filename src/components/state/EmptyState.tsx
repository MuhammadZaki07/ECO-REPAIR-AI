import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  title = "No data found",
  description = "There is no data to display at the moment.",
  icon,
  className,
}: EmptyStateProps) => {
  return (
    <Card
      className={cn(
        "p-10 text-center",
        className
      )}
    >
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}

      <h2 className="text-xl font-semibold">{title}</h2>

      {description && (
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </Card>
  );
};
