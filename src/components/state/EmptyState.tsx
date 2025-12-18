import { Card } from "@/components/ui/Card";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title,
  description,
  icon,
}: EmptyStateProps) => {
  return (
    <Card className="p-10 text-center">
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}
      <h2 className="text-xl font-bold">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      )}
    </Card>
  );
};
