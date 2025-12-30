import { leaderboardColumns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { useDebounce } from "@/hooks/useDebounce";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useEffect } from "react";

export default function LeaderboardPage() {
  const {
    contributors,
    loadingContributors,
    page,
    setPage,
    pageSize,
    totalContributors,
    search,
    setSearch,
    sortBy,
    setSortBy,
    order,
    setOrder,
  } = useLeaderboard();

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, setPage]);

  const totalPages = Math.max(1, Math.ceil(totalContributors / pageSize));

  return (
    <div className="container p-4 space-y-4">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          Top contributors ranked by experience and activity.
        </p>
      </div>

      <DataTable
        columns={leaderboardColumns}
        data={contributors}
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
    </div>
  );
}
