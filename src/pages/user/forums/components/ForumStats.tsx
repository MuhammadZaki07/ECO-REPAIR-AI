import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  BadgeQuestionMark,
  CheckCircle2,
  MessageSquare,
  Trophy,
} from "lucide-react";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useForumDetailRealtime } from "@/hooks/useForumDetailRealtime";
import { DynamicSkeleton } from "@/components/skeletons";
import { useLeaderboard } from "@/hooks/useLeaderboard";

function ForumStats() {
  const { userData } = useAuthContext();
  const { stats, loadingStats } = useForumDetailRealtime("my", userData?.id);
  const { userXP, loadingUserXP } = useLeaderboard(userData?.id);
  
  const statItems = [
    {
      label: "Reputasi",
      value: loadingUserXP ? "..." : `${userXP} XP`,
      icon: Trophy,
      colorClass: "text-emerald-600",
    },
    {
      label: "Jawaban Anda",
      value: loadingStats ? "..." : stats.totalReplies,
      icon: MessageSquare,
      colorClass: "text-purple-600",
    },
    {
      label: "Solusi Berhasil",
      value: loadingStats ? "..." : stats.totalSolutions,
      icon: CheckCircle2,
      colorClass: "text-blue-600",
    },
    {
      label: "Pertanyaan Anda Belum Terjawab",
      value: loadingStats ? "..." : stats.openQuestions,
      icon: BadgeQuestionMark,
      colorClass: "text-orange-600",
    },
  ];

  if (loadingStats) {
    return (
      <DynamicSkeleton
        preset="CARD_GRID"
        count={4}
        className="grid grid-cols-4 gap-2"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <Card key={index} className="border dark:border-none shadow-none">
          <CardHeader className="flex flex-row items-center gap-4 p-5">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.colorClass}`}
            >
              <item.icon className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{item.value}</CardTitle>
              <CardDescription className="text-[10px] uppercase font-semibold">
                {item.label}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default ForumStats;
