import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ImpactMiningService,
  type ImpactMining,
} from "@/services/ImpactMiningService";

export const useImpactMining = (userId?: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["impact-mining", userId];

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<ImpactMining | null>({
    queryKey,
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null;
      return ImpactMiningService.getByUser(userId);
    },
  });

  const updateProgress = useMutation({
    mutationFn: ({
      progress,
      remainingLikes,
    }: {
      progress: number;
      remainingLikes: number;
    }) => {
      if (!userId) throw new Error("User not logged in");
      return ImpactMiningService.updateProgress(
        userId,
        progress,
        remainingLikes
      );
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKey, updated);
    },
  });

  const claimReward = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      return ImpactMiningService.claimReward(userId);
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKey, updated);
    },
  });

  return {
    data,
    loading,
    error,

    refetch,

    updateProgress: updateProgress.mutateAsync,
    claimingProgress: updateProgress.isPending,

    claimReward: claimReward.mutateAsync,
    claimingReward: claimReward.isPending,
  };
};
