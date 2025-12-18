import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string | null;
  actionLabel?: string;
  onAction?: () => void;
}

export const ErrorState = ({
  title = "Terjadi kesalahan",
  description = "Gagal memuat data",
  actionLabel,
  onAction,
}: ErrorStateProps) => {
  return (
    <Card className="p-6 text-center text-red-700">
      <AlertTriangle className="mx-auto mb-3 h-6 w-6" />
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm mt-1">{description}</p>

      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};
