import { useCallback, useEffect, useState } from "react";
import {
  VoucherService,
} from "@/services/VoucherService";
import { useEcoWallet } from "./useEcoWallet";
import type { EcoVoucher, EcoVoucherClaim } from "@/types/voucher";

export const useVouchers = (userId?: string) => {
  const [vouchers, setVouchers] = useState<EcoVoucher[]>([]);
  const [claims, setClaims] = useState<EcoVoucherClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { balance } = useEcoWallet(userId);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const [vouchersData, claimsData] = await Promise.all([
        VoucherService.getActiveVouchers(),
        VoucherService.getUserClaims(userId),
      ]);
      setVouchers(vouchersData);
      setClaims(claimsData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const claimVoucher = useCallback(
    async (voucherId: string) => {
      if (!userId) throw new Error("User not logged in");
      setClaimingId(voucherId);
      try {
        const claim = await VoucherService.claimVoucher(userId, voucherId);
        setClaims((prev) => [...prev, claim]);
        return claim;
      } finally {
        setClaimingId(null);
      }
    },
    [userId]
  );

  const hasClaimed = useCallback(
    (voucherId: string) => claims.some((c) => c.voucher_id === voucherId),
    [claims]
  );

  const canClaim = useCallback(
    (voucherCost: number, voucherId: string) =>
      balance >= voucherCost && !hasClaimed(voucherId),
    [balance, hasClaimed]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    vouchers,
    claims,
    loading,
    error,
    claimingId,
    claimVoucher,
    fetchData,
    hasClaimed,
    canClaim,
    isEmpty: !loading && vouchers.length === 0,
  };
};
