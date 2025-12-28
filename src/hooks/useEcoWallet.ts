import { useQuery, useQueryClient } from "@tanstack/react-query";
import { EcoWalletService } from "@/services/EcoWalletService";

export const useEcoWallet = (userId?: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["eco-wallet", userId],
    queryFn: () => EcoWalletService.getWallet(userId!),
    enabled: !!userId,
    staleTime: 1000 * 30,
  });

  return {
    balance: query.data?.balance ?? 0,
    loading: query.isLoading,
    error: query.error as Error | null,
    refetch: () =>
      queryClient.invalidateQueries({
        queryKey: ["eco-wallet", userId],
      }),
  };
};
