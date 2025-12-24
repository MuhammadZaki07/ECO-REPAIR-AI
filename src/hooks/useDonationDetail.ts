import { useState, useEffect, useCallback } from "react";
import { DonationService } from "@/services/DonationService";

export const useDonationDetail = (campaignId?: string) => {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!campaignId) return;

    try {
      setLoading(true);
      const data = await DonationService.getCampaignDetail(campaignId);
      setDetail(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    detail,
    loading,
    error,
    refetch: fetchDetail,
  };
};
