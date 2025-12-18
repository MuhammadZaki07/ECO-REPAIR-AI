import { AlertTriangle, Inbox } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";

type StateType = "error" | "empty";

interface DynamicStateProps {
  type: StateType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const DynamicState = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
}: DynamicStateProps) => {
  const Icon = type === "error" ? AlertTriangle : Inbox;

  return (
    <Card className="p-10 text-center">
      <Icon
        className={`mx-auto mb-3 h-7 w-7 ${
          type === "error" ? "text-red-600" : "text-muted-foreground"
        }`}
      />
      <h2 className="text-xl font-bold">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};
