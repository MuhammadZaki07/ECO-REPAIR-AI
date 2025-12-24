import { leaderboardColumns } from "./components/columns";
import { DataTable } from "../../../components/ui/data-table";
import { useLeaderboardTable } from "@/hooks/useLeaderboardTable";

export default function LeaderboardPage() {
  const { data, page, totalPages, loading, setPage, setSearch } =
    useLeaderboardTable();

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
        data={data}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
        onSearch={setSearch}
      />
    </div>
  );
}
