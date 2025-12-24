import { useState, useEffect, useCallback } from "react";
import { DonationService, type DonationCampaign } from "@/services/DonationService";

export const useDonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DonationService.getAllCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return {
    campaigns,
    loading,
    error,
    refetch: fetchCampaigns,
    isEmpty: !loading && campaigns.length === 0,
  };
};
