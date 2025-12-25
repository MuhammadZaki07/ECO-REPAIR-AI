import { DataTable } from "@/components/ui/data-table";
import { useState, useMemo } from "react";
import { useHistory } from "@/hooks/useHistory";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDateWithDay } from "@/utils/date";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { ENV } from "@/env";

interface HistoryRow {
  type: string;
  category: string;
  date: string;
  emount: string | number;
}

export default function History() {
  const { userData } = useAuthContext();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 800);

  const { history, loading, pages } = useHistory(
    userData?.id,
    page,
    ENV.PAGE_SIZE,
    debouncedSearch
  );

  const rows = useMemo<HistoryRow[]>(() => {
    return history.map((h: any) => ({
      type: h.type,
      category: h.category ?? "-",
      date: formatDateWithDay(h.created_at),
      emount: h.amount ?? "Completed",
    }));
  }, [history]);

  const columns: ColumnDef<HistoryRow>[] = [
    {
      header: "No.",
      cell: ({ row }) => row.index + 1 + (page - 1) * ENV.PAGE_SIZE,
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Emount",
      accessorKey: "emount",
    },
  ];


  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-bold">History</h3>
      <p className="text-sm text-muted-foreground">
        History of all your activities.
      </p>

      <DataTable
        columns={columns}
        data={rows}
        onSearch={setSearch}
        loading={loading}
        page={page}
        totalPages={pages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(pages, p + 1))}
      />
    </div>
  );
}
