import { DataTable } from "@/components/ui/data-table";
import { useDebounce } from "@/hooks/useDebounce";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useState } from "react";
import { leaderboardColumns } from "./components/column";
import { UserXPHistoryModal } from "./components/UserXPHistoryChart";

export default function LeaderboardPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 800);

  const {
    contributors,
    loadingContributors,
    page,
    setPage,
    pageSize,
    totalContributors,
    sortBy,
    setSortBy,
    order,
    setOrder,
  } = useLeaderboard(selectedUserId ?? undefined, true, debouncedSearch);

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setDialogOpen(true);
  };

  const totalPages = Math.max(1, Math.ceil(totalContributors / pageSize));

  const contributorsWithActions = contributors.map((u) => ({
    ...u,
    onView: handleViewUser,
  }));

  return (
    <div className="container p-4 space-y-4">
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <p className="text-muted-foreground">
        Top contributors ranked by experience and activity.
      </p>

      <DataTable
        columns={leaderboardColumns}
        data={contributorsWithActions}
        loading={loadingContributors}
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        onSearch={setSearch}
        sortBy={sortBy}
        sortOrder={order}
        onSortChange={(columnId, newOrder) => {
          setSortBy(columnId as "total_xp" | "username" | "contributions");
          setOrder(newOrder);
        }}
      />

      {selectedUserId && (
        <UserXPHistoryModal
          userId={selectedUserId}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          adminView={true}
        />
      )}
    </div>
  );
}
