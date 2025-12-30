import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { LeaderboardRow } from "@/types/leaderboard";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export const leaderboardColumns: ColumnDef<LeaderboardRow>[] = [
  {
    id: "rank",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "username",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            {user.avatar_url ? (
              <AvatarImage src={user.avatar_url} />
            ) : (
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <span>{user.username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "xp",
    header: "XP",
    cell: ({ row }) => <Badge variant="outline">{row.getValue<number>("xp")} XP</Badge>,
  },
  {
    accessorKey: "contributions",
    header: "Contributions",
    cell: ({ row }) => <Badge variant="outline">{row.getValue<number>("contributions")}</Badge>,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            row.original.onView?.(user.id);
          }}
        >
          View
        </Button>
      );
    },
    enableSorting: false,
  },
];
