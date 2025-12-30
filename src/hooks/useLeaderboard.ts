import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { LeaderboardService } from "@/services/leaderboardService";
import { ENV } from "@/env";
import { useDebounce } from "./useDebounce";

export const useLeaderboard = (
  userId?: string,
  adminView = false,
  debouncedSearchProp?: string
) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(ENV.PAGE_SIZE ?? 6);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<
    "username" | "total_xp" | "contributions"
  >("total_xp");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const debouncedSearch = debouncedSearchProp ?? useDebounce(search, 500);

  const contributorsQuery = useQuery({
    queryKey: ["leaderboard", page, pageSize, debouncedSearch, sortBy, order],
    queryFn: () =>
      LeaderboardService.getLeaderboardTable({
        page,
        pageSize,
        search: debouncedSearch,
        sortBy,
        order,
      }),
    keepPreviousData: true,
  });

  const userXPQuery = useQuery({
    queryKey: ["leaderboard-user-xp", userId],
    queryFn: () => LeaderboardService.getUserXP(userId!).then((res) => res.xp),
    enabled: !!userId,
  });

  const userXPHistoryQuery = useQuery({
    queryKey: ["user-xp-history", userId],
    queryFn: async () => {
      if (!adminView || !userId) return [];
      const { data, error } = await supabase
        .from("eco_transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: adminView && !!userId,
  });

  useEffect(() => {
    const channel = supabase
      .channel("user_rewards_leaderboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_rewards" },
        () => queryClient.invalidateQueries({ queryKey: ["leaderboard"] })
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`user_rewards_${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_rewards",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["leaderboard-user-xp", userId],
          });
          if (adminView) {
            queryClient.invalidateQueries({
              queryKey: ["user-xp-history", userId],
            });
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient, userId, adminView]);

  return {
    contributors: contributorsQuery.data?.data ?? [],
    totalContributors: contributorsQuery.data?.total ?? 0,
    loadingContributors: contributorsQuery.isLoading,
    errorContributors: contributorsQuery.error,

    userXP: userXPQuery.data ?? 0,
    loadingUserXP: userXPQuery.isLoading,
    errorUserXP: userXPQuery.error,

    userXPHistory: userXPHistoryQuery.data ?? [],
    loadingUserXPHistory: userXPHistoryQuery.isLoading,
    errorUserXPHistory: userXPHistoryQuery.error,

    page,
    setPage,
    pageSize,
    search,
    setSearch,
    sortBy,
    setSortBy,
    order,
    setOrder,
  };
};
