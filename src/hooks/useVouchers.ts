import { useMemo } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { VoucherService } from "@/services/VoucherService";
import { useEcoWallet } from "./useEcoWallet";
import type { EcoVoucher } from "@/types/voucher";

export const useVouchers = (
  userId?: string,
  search = "",
  page = 1,
  limit = 9
) => {
  const queryClient = useQueryClient();
  const { balance } = useEcoWallet(userId);

  const vouchersQuery = useQuery<{
    data: EcoVoucher[];
    total: number;
  }>({
    queryKey: ["vouchers", userId, search, page, limit],
    queryFn: async () => {
      const [{ data, total }, claims] = await Promise.all([
        VoucherService.getActiveVouchers({ search, page, limit }),
        VoucherService.getUserVoucherClaims(userId!),
      ]);

      const merged = data.map((v) => {
        const claim = claims.find((c) => c.voucher_id === v.id);
        return claim
          ? {
              ...v,
              claimed_by: userId,
              claimed_at: claim.claimed_at,
              voucher_code: claim.voucher_code,
            }
          : v;
      });

      return { data: merged, total };
    },
    enabled: !!userId,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const claimMutation = useMutation({
    mutationFn: (voucherId: string) => {
      if (!userId) throw new Error("User not logged in");
      return VoucherService.claimVoucher(userId, voucherId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      queryClient.invalidateQueries({ queryKey: ["eco-wallet", userId] });
    },
  });

  const vouchers = vouchersQuery.data?.data ?? [];

  const hasClaimed = (voucherId: string) =>
    vouchers.some(
      (v) => v.id === voucherId && v.claimed_by === userId
    );

  const canClaim = (cost: number, voucherId: string) =>
    balance >= cost && !hasClaimed(voucherId);

  const pages = useMemo(() => {
    const total = vouchersQuery.data?.total ?? 0;
    return Math.max(1, Math.ceil(total / limit));
  }, [vouchersQuery.data?.total, limit]);

  return {
    vouchers,
    loading: vouchersQuery.isLoading,
    claimingId: claimMutation.isPending
      ? claimMutation.variables ?? null
      : null,

    claimVoucher: (voucherId: string) =>
      claimMutation.mutateAsync(voucherId),

    canClaim,
    total: vouchersQuery.data?.total ?? 0,
    pages,
    isEmpty:
      !vouchersQuery.isLoading && vouchers.length === 0,
  };
};
