import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import type { LeaderboardRow } from "@/types/leaderboard";
import { RankBadge } from "./RankBadge";

const getRankBgClass = (rank: number) => {
  if (rank === 1) return "bg-yellow-300 text-black";
  if (rank === 2) return "bg-neutral-300 text-black";
  if (rank === 3) return "bg-amber-900 text-black";
  return "";
};

export const leaderboardColumns: ColumnDef<LeaderboardRow>[] = [
  {
    id: "rank",
    header: () => <div className="text-center font-semibold text-sm">#</div>,
    cell: ({ row }) => {
      const rank = row.index + 1;

      return (
        <div className={`flex mx-auto justify-center items-center w-10 h-10`}>
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
        className="px-0 font-semibold flex justify-center mx-auto"
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
          <Avatar>
            <AvatarImage loading="lazy" src={row.original.avatar_url} />
            <AvatarFallback className="bg-gray-200 text-gray-700 font-bold">
              {row.original.username?.[0]?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{user?.username}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "xp",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 font-semibold  mx-auto flex justify-center"
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
          variant="secondary"
          className="font-semibold text-green-600 mx-auto flex justify-center"
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
        className="px-0 font-semibold  mx-auto flex justify-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contributions
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="font-semibold  mx-auto flex justify-center"
      >
        {row.getValue<number>("contributions")}
      </Badge>
    ),
  },
];
