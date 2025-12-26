import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TrendingUp, Leaf } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useDailyTips } from "@/hooks/useDailyTips";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { DynamicSkeleton } from "@/components/skeletons";
import { Link } from "react-router-dom";

export default function LeaderboardPanel() {
  const { userData } = useAuthContext();
  const { contributors = [], loadingContributors } = useLeaderboard(
    userData?.id,
    5
  );
  const { dailyTip, loading: loadingTip } = useDailyTips();

  if (loadingTip || loadingContributors) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <DynamicSkeleton preset="CARD_GRID" className="w-full" count={1} />
        <DynamicSkeleton preset="CARD_GRID" className="w-full" count={1} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" /> Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(contributors || []).map((user, idx) => (
            <div
              key={idx + 1}
              className="flex justify-between text-xs font-medium"
            >
              <span>
                {idx + 1}. {user.username}
              </span>
              <span>{user.xp} XP</span>
            </div>
          ))}
          <Link to={"/user/leaderboard"}>
            <Button
              variant="ghost"
              className="w-full text-xs text-green-600 mt-2"
            >
              View Leaderboard
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-green-600 text-white overflow-hidden relative">
        <CardContent className="p-6">
          <h4 className="font-bold mb-2">Tip of the Day</h4>
          <p className="text-xs text-green-50 leading-relaxed">
            {dailyTip?.content || "No tips available today."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
