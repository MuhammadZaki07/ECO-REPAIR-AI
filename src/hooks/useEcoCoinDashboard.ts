import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getActiveDonationCampaigns,
  type DonationCampaignSummary,
} from "./useDonation";
import { donateToCampaign } from "./donationTransaction";

export function useEcoCoinDashboard() {
  const queryClient = useQueryClient();

  const {
    data: donationCampaigns = [],
    isLoading: loadingDonation,
  } = useQuery<DonationCampaignSummary[]>({
    queryKey: ["donation-campaigns", "active"],
    queryFn: getActiveDonationCampaigns,
  });

  const { mutateAsync: donate } = useMutation({
    mutationFn: ({
      campaignId,
      ecoCoin,
    }: {
      campaignId: string;
      ecoCoin: number;
    }) => donateToCampaign(campaignId, ecoCoin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donation-campaigns", "active"],
      });
    },
  });

  return {
    donationCampaigns,
    loadingDonation,
    donate,
  };
}
