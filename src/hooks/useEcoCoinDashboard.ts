import { useEffect, useState, useCallback } from "react";
import {
  getActiveDonationCampaigns,
  type DonationCampaignSummary,
} from "./useDonation";
import { donateToCampaign } from "./donationTransaction";

export function useEcoCoinDashboard() {
  const [donationCampaigns, setDonationCampaigns] = useState<
    DonationCampaignSummary[]
  >([]);
  const [loadingDonation, setLoadingDonation] = useState(true);

  const fetchDonationCampaigns = useCallback(async () => {
    setLoadingDonation(true);
    const data = await getActiveDonationCampaigns();
    setDonationCampaigns(data);
    setLoadingDonation(false);
  }, []);

  const donate = useCallback(
    async (campaignId: string, ecoCoin: number) => {
      await donateToCampaign(campaignId, ecoCoin);
      await fetchDonationCampaigns();
    },
    [fetchDonationCampaigns]
  );

  useEffect(() => {
    fetchDonationCampaigns();
  }, [fetchDonationCampaigns]);

  return {
    donationCampaigns,
    loadingDonation,
    donate,
  };
}
