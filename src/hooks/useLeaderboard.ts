import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { LeaderboardService } from "@/services/leaderboardService";

export const useLeaderboard = (userId?: string, limit = 5, search = "") => {
  const [contributors, setContributors] = useState<any[]>([]);
  const [loadingContributors, setLoadingContributors] = useState(true);
  const [errorContributors, setErrorContributors] = useState<Error | null>(null);

  const [userXP, setUserXP] = useState(0);
  const [loadingUserXP, setLoadingUserXP] = useState(true);
  const [errorUserXP, setErrorUserXP] = useState<Error | null>(null);

  const fetchContributors = useCallback(async () => {
    setLoadingContributors(true);
    try {
      const data = await LeaderboardService.getTopContributors(limit, search);
      setContributors(data);
      setErrorContributors(null);
    } catch (err: any) {
      setErrorContributors(err);
    } finally {
      setLoadingContributors(false);
    }
  }, [limit, search]);

  const fetchUserXP = useCallback(async () => {
    if (!userId) return;
    setLoadingUserXP(true);
    try {
      const { xp } = await LeaderboardService.getUserXP(userId);
      setUserXP(xp);
      setErrorUserXP(null);
    } catch (err: any) {
      setErrorUserXP(err);
    } finally {
      setLoadingUserXP(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchContributors();
    const channel = supabase
      .channel("user_rewards_leaderboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_rewards" },
        fetchContributors
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [fetchContributors]);

  useEffect(() => {
    if (!userId) return;
    fetchUserXP();
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
        fetchUserXP
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [fetchUserXP, userId]);

  return {
    contributors,
    loadingContributors,
    errorContributors,
    refetchContributors: fetchContributors,
    userXP,
    loadingUserXP,
    errorUserXP,
    refetchUserXP: fetchUserXP,
  };
};
