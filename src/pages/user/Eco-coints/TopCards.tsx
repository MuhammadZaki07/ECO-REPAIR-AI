import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Coins, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/liquid-glass-button";
import { Globe } from "@/components/ui/globe";
import { Skeleton } from "@/components/ui/skeleton";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import { useUserLevel } from "@/hooks/useUserLevel";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useDailyMining } from "@/hooks/useDailyMining";
import { useDailyTips } from "@/hooks/useDailyTips";

export default function TopCards() {
  const { userData } = useAuthContext();
  const { balance, loading: walletLoading } = useEcoWallet(userData?.id);
  const { status, loading: miningLoading, claiming, claim } = useDailyMining();
  const { level, badges, loading: levelLoading } = useUserLevel(userData?.id);
  const { dailyTip } = useDailyTips();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 relative border-none bg-gradient-to-br dark:from-emerald-900 from-neutral-200 dark:via-emerald-950 via-neutral-400 to-black text-white shadow-2xl overflow-hidden min-h-[320px]">
        <div className="absolute top-0 right-0 w-full h-full opacity-50 pointer-events-none">
          <Globe className="absolute -right-20 -bottom-40 lg:-right-40 lg:-bottom-60 scale-125" />
        </div>

        <CardContent className="p-10 relative z-10 flex flex-col h-full justify-between">
          <div>
            <Badge variant="outline" className="mb-6 flex items-center">
              <ShieldCheck className="w-3 h-3 mr-2" />
              Level:{" "}
              {levelLoading ? "Loading..." : level?.level_name || "Beginner"}
            </Badge>

            <div className="space-y-1">
              <p className="dark:text-green-200/50 text-neutral-900 font-medium tracking-[0.2em] uppercase text-[10px]">
                Available Contribution Credits
              </p>

              {walletLoading ? (
                <Skeleton className="h-20 w-64 bg-white/10" />
              ) : (
                <div className="flex items-baseline gap-3 text-neutral-900 dark:text-white">
                  <h2 className="text-7xl font-mono tracking-tighter">
                    {balance.toLocaleString("id-ID")}
                  </h2>
                  <span className="text-2xl font-mono italic">EC</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              {levelLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                badges.map((b) => <Badge key={b.id}>{b.badge}</Badge>)
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none flex flex-col justify-between overflow-hidden relative">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-xl">
              <Coins className="w-4 h-4 text-green-500" />
            </div>
            Impact Mining
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          {miningLoading || !status ? (
            <Skeleton className="h-28 w-full" />
          ) : (
            <>
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wide">
                  Tip of the Day
                </h4>
                <p className="text-xs leading-relaxed">
                  {dailyTip?.content || "No tips available today."}
                </p>
              </div>

              <div className="space-y-2">
                <Progress
                  value={Math.min(status.progress, 100)}
                  className="h-1.5 bg-green-500/10"
                />
                <p className="text-[11px] text-muted-foreground">
                  Progress today{" "}
                  <span className="font-bold">{status.progress}%</span>
                  {status.progress >= 100 && "Bonus unlocked!"}
                </p>
              </div>

              <Button
                variant="secondary"
                className="w-full rounded-xl"
                disabled={!status.can_claim || claiming}
                onClick={claim}
              >
                {status.can_claim
                  ? claiming
                    ? "Claiming..."
                    : "Claim Daily Reward"
                  : "Already Claimed Today"}
                <ArrowUpRight className="w-3 h-3 ml-2" />
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
