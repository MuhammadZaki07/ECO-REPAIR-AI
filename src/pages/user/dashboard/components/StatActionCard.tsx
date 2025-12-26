import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  actionLabel: string;
  to: string;
  loading: boolean;
};

export function StatActionCard({
  label,
  loading,
  value,
  icon: Icon,
  color,
  actionLabel,
  to,
}: Props) {
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <Card className="p-5 rounded-2xl flex flex-col justify-between bg-transparent border-none shadow-none">
          <div>
            <Icon strokeWidth={1} className={`w-8 h-8 mb-4 ${color}`} />
            <p className="text-sm uppercase tracking-widest text-zinc-500 font-bold">
              {label}
            </p>
            <p className="text-7xl font-black italic mt-1">{value}</p>
          </div>

          <Button asChild variant="link">
            <Link to={to}>{actionLabel} →</Link>
          </Button>
        </Card>
      )}
    </>
  );
}
