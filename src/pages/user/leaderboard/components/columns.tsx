import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import type { LeaderboardRow } from "@/types/leaderboard";
import { RankBadge } from "./RankBadge";

  const getRankBgClass = (rank: number) => {
    if (rank === 1) return "bg-yellow-50 dark:bg-yellow-800/30";
    if (rank === 2) return "bg-gray-50 dark:bg-gray-900/40";
    if (rank === 3) return "bg-amber-50 dark:bg-amber-950/30";
    return "";
  };

export const leaderboardColumns: ColumnDef<LeaderboardRow>[] = [
  {
    id: "rank",
    header: "#",
    cell: ({ row }) => {
      const rank = row.index + 1;

      return (
        <div
          className={`flex mx-auto justify-center items-center w-10 h-10`}
        >
          <RankBadge rank={rank} />
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original;
      const rank = row.index + 1;

      return (
        <div
          className={`flex items-center justify-center gap-3 px-2 py-1 rounded-lg ${getRankBgClass(
            rank
          )}`}
        >
          <Avatar className="h-7 w-7">
            {user.avatar_url ? (
              <AvatarImage src={user.avatar_url} />
            ) : (
              <AvatarFallback>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="font-medium">{user.username}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "xp",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        XP
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const xp = row.getValue<number>("xp");

      return (
        <Badge
          variant="outline"
          className="font-semibold text-emerald-600 border-emerald-300"
        >
          {xp} XP
        </Badge>
      );
    },
  },

  {
    accessorKey: "contributions",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contributions
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="font-semibold">
        {row.getValue<number>("contributions")}
      </Badge>
    ),
  },
];
