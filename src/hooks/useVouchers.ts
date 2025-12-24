import { useCallback, useEffect, useState } from "react";
import { VoucherService, type EcoVoucher } from "@/services/VoucherService";

export const useVouchers = (userId?: string) => {
  const [vouchers, setVouchers] = useState<EcoVoucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchVouchers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await VoucherService.getActiveVouchers();
      setVouchers(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const claimVoucher = useCallback(
    async (voucherId: string) => {
      try {
        setClaimingId(voucherId);
        const res = await VoucherService.claimVoucher(voucherId);

        if (!res?.voucher_code) {
          throw new Error("Voucher claim failed");
        }

        setVouchers((prev) =>
          prev.map((v) =>
            v.id === voucherId
              ? {
                  ...v,
                  voucher_code: res.voucher_code,
                  claimed_by: userId ?? "me",
                  claimed_at: new Date().toISOString(),
                }
              : v
          )
        );

        return res.voucher_code;
      } finally {
        setClaimingId(null);
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  return {
    vouchers,
    loading,
    error,
    claimVoucher,
    claimingId,
    refetch: fetchVouchers,
    isEmpty: !loading && vouchers.length === 0,
  };
};
