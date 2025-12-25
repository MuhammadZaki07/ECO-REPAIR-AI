import { useState, useEffect, useCallback, useMemo } from "react";
import { DonationService } from "@/services/DonationService";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import type { EcoDonationCampaign, EcoDonationRecord } from "@/types/donations";
import { ENV } from "@/env";

export const useDonation = (parentSearch = "", parentPage = 1) => {
  const { userData } = useAuthContext();
  const { balance, refetch: refetchBalance } = useEcoWallet(userData?.id);

  const [campaigns, setCampaigns] = useState<EcoDonationCampaign[]>([]);
  const [records, setRecords] = useState<EcoDonationRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(parentPage);
  const [search, setSearch] = useState(parentSearch);

  const fetchCampaigns = useCallback(async () => {
    if (!userData) return;
    setLoading(true);
    try {
      const { data, total: totalCount } = await DonationService.getCampaigns({
        search,
        page,
        pageSize: ENV.PAGE_SIZE,
      });
      setCampaigns(data);
      setTotal(totalCount ?? data.length);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userData, search, page]);

  const fetchRecords = useCallback(async () => {
    if (!userData) return;
    try {
      const data = await DonationService.getUserRecords(userData.id);
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  }, [userData]);

  useEffect(() => {
    fetchCampaigns() 
    fetchRecords()
  }, []);

  const donate = useCallback(
    async (campaignId: string, amount: number) => {
      if (!userData) throw new Error("User not logged in");
      await DonationService.donate(userData.id, campaignId, amount);
    },
    [userData]
  );

  const totalPages = useMemo(() => Math.ceil(total / ENV.PAGE_SIZE), [total]);

  return {
    campaigns,
    records,
    balance,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    donate,
  };
};
