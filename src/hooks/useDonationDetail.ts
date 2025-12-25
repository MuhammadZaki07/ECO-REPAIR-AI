import { useState, useEffect, useCallback } from "react";
import { DonationService } from "@/services/DonationService";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import type { CampaignWithDonors, EcoDonationRecord } from "@/types/donations";

export const useDonationDetail = (campaignId?: string) => {
  const { userData } = useAuthContext();
  const { balance, refetch: refetchBalance } = useEcoWallet(userData?.id);
  const [detail, setDetail] = useState<CampaignWithDonors | null>(null);
  const [userRecords, setUserRecords] = useState<EcoDonationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!campaignId || !userData) return;
    setLoading(true);

    try {
      const data = await DonationService.getCampaignByIdWithDonors(campaignId);
      setDetail(data);

      const myRecords = data.donors
        .filter((d) => d.id === userData.id)
        .map((d) => ({ campaign_id: campaignId, amount: d.amount, id: d.id }));
      setUserRecords(myRecords);

      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      await refetchBalance?.();
    }
  }, [campaignId, userData, refetchBalance]);

  const donate = useCallback(
    async (amount: number) => {
      if (!campaignId || !userData) throw new Error("User not logged in");
      await DonationService.donate(userData.id, campaignId, amount);
    },
    [campaignId, userData]
  );

  const userHasDonated = useCallback(() => {
    return userRecords.length > 0;
  }, [userRecords]);

  useEffect(() => {
    fetchDetail();
  }, []);

  return {
    detail,
    userRecords,
    balance,
    loading,
    error,
    donate,
    userHasDonated,
    refetch: fetchDetail,
  };
};
