import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DonationService } from "@/services/DonationService";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import type {
  EcoDonationCampaign,
  EcoDonationRecord,
} from "@/types/donations";
import { ENV } from "@/env";

export const useDonation = (parentSearch = "", parentPage = 1) => {
  const queryClient = useQueryClient();
  const { userData } = useAuthContext();
  const { balance, refetch: refetchBalance } = useEcoWallet(userData?.id);

  const [page, setPage] = useState(parentPage);
  const [search, setSearch] = useState(parentSearch);

  const campaignsQuery = useQuery<{
    data: EcoDonationCampaign[];
    total: number;
  }>({
    queryKey: ["donation-campaigns", search, page],
    queryFn: () =>
      DonationService.getCampaigns({
        search,
        page,
        pageSize: ENV.PAGE_SIZE,
      }),
    enabled: !!userData,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const recordsQuery = useQuery<EcoDonationRecord[]>({
    queryKey: ["donation-records", userData?.id],
    queryFn: () => DonationService.getUserRecords(userData!.id),
    enabled: !!userData,
    staleTime: 1000 * 60 * 5,
  });

  const donateMutation = useMutation({
    mutationFn: ({
      campaignId,
      amount,
    }: {
      campaignId: string;
      amount: number;
    }) => {
      if (!userData) throw new Error("User not logged in");
      return DonationService.donate(userData.id, campaignId, amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donation-campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["donation-records"] });
      refetchBalance();
    },
  });

  const totalPages = useMemo(() => {
    const total = campaignsQuery.data?.total ?? 0;
    return Math.ceil(total / ENV.PAGE_SIZE);
  }, [campaignsQuery.data?.total]);

  return {
    campaigns: campaignsQuery.data?.data ?? [],
    records: recordsQuery.data ?? [],
    balance,

    loading: campaignsQuery.isLoading,
    error: campaignsQuery.error as Error | null,

    page,
    setPage,
    search,
    setSearch,
    totalPages,

    donate: (campaignId: string, amount: number) =>
      donateMutation.mutateAsync({ campaignId, amount }),
  };
};
