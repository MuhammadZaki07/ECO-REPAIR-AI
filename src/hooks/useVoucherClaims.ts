import { useQuery } from "@tanstack/react-query";
import { VoucherService } from "@/services/VoucherService";
import type { Claim } from "@/types/voucher";

export const useVoucherClaims = (voucherId?: string) => {
  const query = useQuery({
    queryKey: ["voucher-claims", voucherId],
    queryFn: () => VoucherService.getUserVoucherClaimsByVoucher(voucherId!),
    enabled: !!voucherId,
  });

  return query as {
    data: Claim[];
    isLoading: boolean;
    error: unknown;
  };
};
