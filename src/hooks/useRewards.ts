import { useEffect, useState, useCallback } from "react";
import {
  RewardService,
  type Reward,
  type RewardType,
} from "@/services/RewardService";

export const useRewards = (type?: RewardType) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRewards = useCallback(async () => {
    try {
      setLoading(true);
      const data = await RewardService.getActiveRewards(type);
      setRewards(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  return {
    rewards,
    loading,
    error,
    refetch: fetchRewards,
    isEmpty: !loading && rewards.length === 0,
  };
};
