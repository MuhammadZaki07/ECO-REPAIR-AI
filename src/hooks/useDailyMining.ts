import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useAuthContext } from "@/hooks/context/AuthContext";

interface MiningStatus {
  progress: number;
  can_claim: boolean;
  last_claim_date: string | null;
}

export function useDailyMining() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const statusQuery = useQuery<MiningStatus>({
    queryKey: ["daily-mining-status", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        "get_daily_mining_status",
        { p_auth_id: user!.id }
      );
      if (error) throw error;
      return data;
    },
    enabled: !!user,
    staleTime: 1000 * 30,
  });

  const claimMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc(
        "claim_daily_mining_reward",
        { p_auth_id: user!.id }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["daily-mining-status", user?.id],
      });
    },
  });

  return {
    status: statusQuery.data ?? null,
    loading: statusQuery.isLoading,
    error: statusQuery.error
      ? (statusQuery.error as Error).message
      : null,

    claiming: claimMutation.isPending,
    claim: claimMutation.mutateAsync,

    refetch: statusQuery.refetch,
  };
}
