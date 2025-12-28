import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { LeaderboardService } from "@/services/leaderboardService";

export const useLeaderboard = (
  userId?: string,
  limit = 5,
  search = ""
) => {
  const queryClient = useQueryClient();

  const contributorsQuery = useQuery({
    queryKey: ["leaderboard", limit, search],
    queryFn: () =>
      LeaderboardService.getTopContributors(limit, search),
    keepPreviousData: true,
  });

  const userXPQuery = useQuery({
    queryKey: ["leaderboard-user-xp", userId],
    queryFn: () =>
      LeaderboardService.getUserXP(userId!).then(
        (res) => res.xp
      ),
    enabled: !!userId,
  });

  useEffect(() => {
    const channel = supabase
      .channel("user_rewards_leaderboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_rewards" },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["leaderboard"],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, userId]);

  return {
    contributors: contributorsQuery.data ?? [],
    loadingContributors: contributorsQuery.isLoading,
    errorContributors: contributorsQuery.error,
    refetchContributors: contributorsQuery.refetch,

    userXP: userXPQuery.data ?? 0,
    loadingUserXP: userXPQuery.isLoading,
    errorUserXP: userXPQuery.error,
    refetchUserXP: userXPQuery.refetch,
  };
};
