import { LeaderboardService } from "@/services/leaderboardService";
import { useCallback, useEffect, useState } from "react";

export const useLeaderboardTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"xp" | "username">("xp");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE
  const [pageSize] = useState(PAGE_SIZE || 6);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await LeaderboardService.getLeaderboardTable({
        page,
        pageSize,
        sortBy,
        order,
        search,
      });

      setData(res.data);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, order, search]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    data,
    loading,

    page,
    setPage,
    totalPages,

    sortBy,
    setSortBy,
    order,
    setOrder,

    search,
    setSearch,

    refetch: fetch,
  };
};
