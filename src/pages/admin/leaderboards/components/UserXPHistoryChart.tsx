import { useLeaderboard } from "@/hooks/useLeaderboard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { X, TrendingUp, Calendar, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
interface UserXPHistoryModalProps {
  userId: string | null;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  adminView?: boolean;
}

const chartConfig = {
  xp: {
    label: "XP Gained",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function UserXPHistoryModal({
  userId,
  dialogOpen,
  setDialogOpen,
  adminView = true,
}: UserXPHistoryModalProps) {
  const { userXPHistory, loadingUserXPHistory } = useLeaderboard(
    userId ?? undefined,
    adminView
  );

  const safeHistory = Array.isArray(userXPHistory) ? userXPHistory : [];
  const chartData = safeHistory
    .slice()
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .map((r, idx) => ({
      action: r.action ?? "Unknown",
      xp: typeof r.xp === "number" ? r.xp : 0,
      id: idx,
      date: new Date(r.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

  const totalXP = safeHistory.reduce((sum, r) => sum + (r.xp || 0), 0);
  const avgXP =
    safeHistory.length > 0 ? Math.round(totalXP / safeHistory.length) : 0;

  if (!dialogOpen) return null;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          <div className="relative p-6 border-b border-neutral-200 dark:border-neutral-800">
            <DialogTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              XP History
            </DialogTitle>
            <p className="text-muted-foreground text-sm mt-1">
              Track your experience progress over time
            </p>

            <button
              onClick={() => setDialogOpen(false)}
              className="absolute top-4 right-4 p-2 cursor-pointer rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-6">
            {loadingUserXPHistory ? (
              <Skeleton className="h-full w-[400px] rounded-lg" />
            ) : chartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No XP History Yet
                </h3>
                <p className="text-sm text-neutral-500">
                  Start completing actions to earn XP!
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                      Total XP
                    </div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {totalXP.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
                      Activities
                    </div>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {safeHistory.length}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
                      Average XP
                    </div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {avgXP}
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    XP Progress Chart
                  </h3>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[250px] w-full"
                  >
                    <BarChart data={chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        className="stroke-neutral-200 dark:stroke-neutral-700"
                      />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            indicator="dashed"
                            labelKey="action"
                          />
                        }
                      />
                      <Bar
                        dataKey="xp"
                        fill="var(--color-xp)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>

                {/* Recent Activities */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Recent Activities
                  </h3>
                  <div className="space-y-2">
                    {safeHistory
                      .slice()
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .map((r) => {
                        const date = new Date(r.created_at);
                        const isPositive = r.xp > 0;

                        return (
                          <div
                            key={r.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow"
                          >
                            <div
                              className={`p-2 rounded-full ${
                                isPositive
                                  ? "bg-green-100 dark:bg-green-900/30"
                                  : "bg-red-100 dark:bg-red-900/30"
                              }`}
                            >
                              <Award
                                className={`w-4 h-4 ${
                                  isPositive
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">
                                {r.action}
                              </div>
                              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                {date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}{" "}
                                at{" "}
                                {date.toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>

                            <div
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                isPositive
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {isPositive ? "+" : ""}
                              {r.xp} XP
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
