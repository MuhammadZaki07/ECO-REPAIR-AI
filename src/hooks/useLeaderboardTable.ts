import { ENV } from "@/env";
import { LeaderboardService } from "@/services/leaderboardService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useLeaderboardTable = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"xp" | "username">("xp");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  const pageSize = ENV.PAGE_SIZE || 6;

  const queryKey = [
    "leaderboard-table",
    page,
    pageSize,
    sortBy,
    order,
    search,
  ];

  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      return LeaderboardService.getLeaderboardTable({
        page,
        pageSize,
        sortBy,
        order,
        search,
      });
    },
    keepPreviousData: true,
  });

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    data: data?.data ?? [],
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

    refetch,
  };
};
