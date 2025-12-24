import { useCallback, useEffect, useState } from "react";
import { VoucherService } from "@/services/VoucherService";
import { useEcoWallet } from "./useEcoWallet";
import type { EcoVoucher } from "@/types/voucher";

export const useVouchers = (
  userId?: string,
  search?: string,
  page = 1,
  limit = 9
) => {
  const [vouchers, setVouchers] = useState<EcoVoucher[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const { balance } = useEcoWallet(userId);

  const fetchVouchers = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const [{ data, total }, claims] = await Promise.all([
      VoucherService.getActiveVouchers({
        search,
        page,
        limit,
      }),
      VoucherService.getUserVoucherClaims(userId),
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

    setVouchers(merged);
    setTotal(total);
    setLoading(false);
  }, [userId, search, page, limit]);

  const claimVoucher = useCallback(
    async (voucherId: string) => {
      if (!userId) throw new Error("User not logged in");

      setClaimingId(voucherId);
      try {
        const result = await VoucherService.claimVoucher(userId, voucherId);

        setVouchers((prev) =>
          prev.map((v) =>
            v.id === voucherId
              ? {
                  ...v,
                  claimed_by: userId,
                  claimed_at: result.claimed_at,
                  voucher_code: result.voucher_code,
                }
              : v
          )
        );

        return result;
      } finally {
        setClaimingId(null);
      }
    },
    [userId]
  );

  const hasClaimed = (voucherId: string) =>
    vouchers.some((v) => v.id === voucherId && v.claimed_by === userId);

  const canClaim = (cost: number, voucherId: string) =>
    balance >= cost && !hasClaimed(voucherId);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  return {
    vouchers,
    loading,
    claimingId,
    claimVoucher,
    canClaim,
    total,
    pages: Math.ceil(total / limit),
    isEmpty: !loading && vouchers.length === 0,
  };
};
