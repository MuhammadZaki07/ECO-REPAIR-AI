import { DataTable } from "@/components/ui/data-table";
import { useState, useMemo } from "react";
import { useEcoHistory } from "@/hooks/useEcoHistory";
import { useAuth } from "@/hooks/useAuth";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDateID } from "@/utils/date";

/** ======================
 *  UI INTERFACE
 *  ====================== */
interface HistoryRow {
  type: "Voucher" | "Merchandise" | "Donation";
  title: string;
  date: string;
  status: "Claimed" | "Ordered" | "Donated";
}

export default function History() {
  const { user } = useAuth();
  const { history, loading } = useEcoHistory(user?.id);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = import.meta.env.VITE_PAGE_SIZE ?? 6;

  /** ======================
   *  TRANSFORM DATA (DB → UI)
   *  ====================== */
  const list: HistoryRow[] = useMemo(() => {
    return history.map((item) => {
      if (item.eco_vouchers) {
        return {
          type: "Voucher",
          title: item.eco_vouchers.title,
          date: formatDateID(item.created_at),
          status: "Claimed",
        };
      }

      if (item.rewards) {
        return {
          type: "Merchandise",
          title: item.rewards.title,
          date: formatDateID(item.created_at),
          status: "Ordered",
        };
      }

      if (item.donation_campaigns) {
        return {
          type: "Donation",
          title: item.donation_campaigns.title,
          date: formatDateID(item.created_at),
          status: "Donated",
        };
      }

      // fallback (harusnya ga kejadian)
      return {
        type: "Voucher",
        title: "-",
        date: formatDateID(item.created_at),
        status: "Claimed",
      };
    });
  }, [history]);

  /** ======================
   *  SEARCH + PAGINATION
   *  ====================== */
  const filtered = useMemo(
    () =>
      list.filter((h) => h.title.toLowerCase().includes(search.toLowerCase())),
    [list, search]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize]
  );

  /** ======================
   *  TABLE COLUMNS (TYPED)
   *  ====================== */
  const historyColumns: ColumnDef<HistoryRow>[] = [
    {
      header: "No.",
      cell: ({ row }) => row.index + 1,
      meta: { align: "center" },
    },
    {
      header: "Type",
      accessorKey: "type",
      meta: { align: "left" },
    },
    {
      header: "Title",
      accessorKey: "title",
      meta: { align: "left" },
    },
    {
      header: "Date",
      accessorKey: "date",
      meta: { align: "center" },
    },
    {
      header: "Status",
      accessorKey: "status",
      meta: { align: "center" },
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-bold">History</h3>
      <p className="text-sm text-muted-foreground">
        History of all your activities — voucher claims, merchandise, and
        donations.
      </p>

      <DataTable
        columns={historyColumns}
        data={paginated}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        onSearch={setSearch}
      />
    </div>
  );
}
