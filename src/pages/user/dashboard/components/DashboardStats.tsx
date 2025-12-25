import { History, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

import { StatActionCard } from "./StatActionCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

type Props = {
  totalEarned: number;
  diagnosisCount: number;
};

export default function DashboardStats({ totalEarned, diagnosisCount }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="col-span-2 relative overflow-hidden rounded-3xl border-zinc-800 bg-gradient-to-br from-black via-black/90 to-neutral-900 p-8">
        <FlickeringGrid
          className="absolute inset-0 ml-2 mt-1.5"
          squareSize={3.5}
          gridGap={5}
          color="#22c55e"
          maxOpacity={0.35}
          flickerChance={0.1}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-neutral-950/70 to-transparent" />
        <div className="relative z-10 max-w-lg space-y-4">
          <Badge className="w-fit bg-green-500/10 text-green-500 border-green-500/20 text-[10px] font-bold">
            BETA
          </Badge>

          <h2 className="text-3xl font-black tracking-tight">ECO REPAIR AI</h2>

          <p className="text-sm text-zinc-400 leading-relaxed">
            Diagnose vehicle issues instantly using AI. Faster insights, smarter
            repairs, and real eco impact.
          </p>

          <Link to="/user/scan" className="inline-block pt-2">
            <Button variant="outline" className="rounded-xl px-6">
              Start Diagnosis
            </Button>
          </Link>
        </div>
      </Card>

      <StatActionCard
        label="Diagnosis"
        value={diagnosisCount}
        icon={History}
        color="text-blue-500"
        actionLabel="See Records"
        to="/user/history"
      />

      <StatActionCard
        label="Experience"
        value={totalEarned}
        icon={TrendingUp}
        color="text-amber-500"
        actionLabel="Leaderboard"
        to="/user/leaderboard"
      />
    </div>
  );
}
