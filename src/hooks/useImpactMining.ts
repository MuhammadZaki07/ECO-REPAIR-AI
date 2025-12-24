import { useState, useEffect, useCallback } from "react";
import { ImpactMiningService, type ImpactMining } from "@/services/ImpactMiningService";

export const useImpactMining = (userId?: string) => {
  const [data, setData] = useState<ImpactMining | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const mining = await ImpactMiningService.getByUser(userId);
      setData(mining);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateProgress = useCallback(async (progress: number, remainingLikes: number) => {
    if (!userId) return;
    const updated = await ImpactMiningService.updateProgress(userId, progress, remainingLikes);
    setData(updated);
  }, [userId]);

  const claimReward = useCallback(async () => {
    if (!userId) return;
    const updated = await ImpactMiningService.claimReward(userId);
    setData(updated);
  }, [userId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch, updateProgress, claimReward };
};
