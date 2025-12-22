import { Crown } from "lucide-react";

interface RankBadgeProps {
  rank: number;
}

export const RankBadge = ({ rank }: RankBadgeProps) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Crown className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Crown className="w-5 h-5 text-amber-600" />;

  return <span className="font-semibold text-muted-foreground">{rank}</span>;
};
