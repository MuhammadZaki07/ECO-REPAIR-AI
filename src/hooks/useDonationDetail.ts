import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DonationService } from "@/services/DonationService";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import type {
  CampaignWithDonors,
  EcoDonationRecord,
} from "@/types/donations";

export const useDonationDetail = (campaignId?: string) => {
  const queryClient = useQueryClient();
  const { userData } = useAuthContext();
  const { balance, refetch: refetchBalance } = useEcoWallet(userData?.id);

  const {
    data: detail,
    isLoading,
    error,
    refetch,
  } = useQuery<CampaignWithDonors>({
    queryKey: ["donation-campaign-detail", campaignId],
    queryFn: () =>
      DonationService.getCampaignByIdWithDonors(campaignId!),
    enabled: !!campaignId,
  });

  const userRecords: EcoDonationRecord[] =
    detail?.donors
      ?.filter((d) => d.id === userData?.id)
      .map((d) => ({
        id: d.id,
        campaign_id: campaignId!,
        amount: d.amount,
      })) ?? [];

  const donateMutation = useMutation({
    mutationFn: async (amount: number) => {
      if (!campaignId || !userData) {
        throw new Error("User not logged in");
      }
      return DonationService.donate(userData.id, campaignId, amount);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["donation-campaign-detail", campaignId],
        }),
        refetchBalance?.(),
      ]);
    },
  });

  return {
    detail: detail ?? null,
    userRecords,
    balance,
    loading: isLoading || donateMutation.isPending,
    error:
      (error as Error | null) ||
      (donateMutation.error as Error | null),
    donate: donateMutation.mutateAsync,
    userHasDonated: userRecords.length > 0,
    refetch,
  };
};
