import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VoucherService } from "@/services/VoucherService";
import { useEcoWallet } from "./useEcoWallet";
import type { EcoVoucher } from "@/types/voucher";
import { ENV } from "@/env";

export const useVouchers = (
  userId?: string,
  search = "",
  page = 1,
  limit = ENV.PAGE_SIZE
) => {
  const queryClient = useQueryClient();
  const { balance } = useEcoWallet(userId);

  const [sortBy, setSortBy] = useState<keyof EcoVoucher>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const handleSort = (column: keyof EcoVoucher) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const vouchersQuery = useQuery<{
    data: EcoVoucher[];
    total: number;
  }>({
    queryKey: ["vouchers", userId, search, page, limit],
    queryFn: async () => {
      const [{ data, total }, claims] = await Promise.all([
        VoucherService.getActiveVouchers({ search, page, limit }),
        userId
          ? VoucherService.getUserVoucherClaims(userId)
          : Promise.resolve([]),
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

  const adminVouchersQuery = useQuery<{
    data: EcoVoucher[];
    total: number;
  }>({
    queryKey: ["admin-vouchers", search, page, limit, sortBy, sortOrder],
    queryFn: () =>
      VoucherService.getAllVouchers({
        search,
        page,
        limit,
        sortBy,
        sortOrder,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const createVoucherMutation = useMutation({
    mutationFn: (payload: {
      title: string;
      eco_coin_cost: number;
      provider?: string;
      active?: boolean;
    }) => VoucherService.createVoucher(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-vouchers"] });
    },
  });

  const updateVoucherMutation = useMutation({
    mutationFn: (args: { voucherId: string; payload: Partial<EcoVoucher> }) =>
      VoucherService.updateVoucher(args.voucherId, args.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-vouchers"] });
    },
  });

  const deleteVoucherMutation = useMutation({
    mutationFn: (voucherId: string) => VoucherService.deleteVoucher(voucherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-vouchers"] });
    },
  });

  const vouchers = vouchersQuery.data?.data ?? [];
  const adminVouchers = adminVouchersQuery.data?.data ?? [];

  const hasClaimed = (voucherId: string) =>
    vouchers.some((v) => v.id === voucherId && v.claimed_by === userId);

  const canClaim = (cost: number, voucherId: string) =>
    balance >= cost && !hasClaimed(voucherId);

  const pages = useMemo(() => {
    const total = vouchersQuery.data?.total ?? 0;
    return Math.max(1, Math.ceil(total / limit));
  }, [vouchersQuery.data?.total, limit]);

  const adminPages = useMemo(() => {
    const total = adminVouchersQuery.data?.total ?? 0;
    return Math.max(1, Math.ceil(total / limit));
  }, [adminVouchersQuery.data?.total, limit]);

  const adminTotal = adminVouchersQuery.data?.total ?? 0;

  return {
    vouchers,
    loading: vouchersQuery.isLoading,
    claimingId: claimMutation.isPending
      ? claimMutation.variables ?? null
      : null,
    claimVoucher: (voucherId: string) => claimMutation.mutateAsync(voucherId),
    canClaim,
    total: vouchersQuery.data?.total ?? 0,
    pages,
    isEmpty: !vouchersQuery.isLoading && vouchers.length === 0,

    adminTotal,
    adminVouchers,
    adminLoading: adminVouchersQuery.isLoading,
    adminPages,
    sortBy,
    sortOrder,
    handleSort,
    setSortBy,
    setSortOrder,
    createVoucher: createVoucherMutation.mutateAsync,
    updateVoucher: updateVoucherMutation.mutateAsync,
    deleteVoucher: deleteVoucherMutation.mutateAsync,
  };
};
