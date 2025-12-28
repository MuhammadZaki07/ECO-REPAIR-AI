import { useQuery } from "@tanstack/react-query";
import {
  RewardService,
  type RewardType,
} from "@/services/RewardService";

export const useRewards = (type?: RewardType) => {
  const query = useQuery({
    queryKey: ["rewards", type],
    queryFn: () => RewardService.getActiveRewards(type),
    enabled: !!type || type === undefined,
    staleTime: 1000 * 60 * 5,
  });

  return {
    rewards: query.data ?? [],
    loading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
    isEmpty: !query.isLoading && (query.data?.length ?? 0) === 0,
  };
};
