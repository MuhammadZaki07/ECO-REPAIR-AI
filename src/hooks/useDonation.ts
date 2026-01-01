import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DonationService } from "@/services/DonationService";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import type { EcoDonationCampaign, EcoDonationRecord } from "@/types/donations";
import { ENV } from "@/env";

export const useDonation = (
  parentSearch = "",
  parentPage = 1,
  onlyActive = true,
  defaultSortBy: "created_at" | "title" = "created_at",
  defaultSortOrder: "asc" | "desc" = "desc"
) => {
  const queryClient = useQueryClient();
  const { userData } = useAuthContext();
  const { balance, refetch: refetchBalance } = useEcoWallet(userData?.id);
  const [page, setPage] = useState(parentPage);
  const [search, setSearch] = useState(parentSearch);
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const campaignsQuery = useQuery<{
    data: EcoDonationCampaign[];
    total: number;
  }>({
    queryKey: [
      "donation-campaigns",
      {
        search,
        page,
        onlyActive,
        sortBy,
        sortOrder,
      },
    ],
    queryFn: () =>
      DonationService.getCampaigns({
        search,
        page,
        pageSize: ENV.PAGE_SIZE,
        is_active: onlyActive,
        sortBy,
        sortOrder,
      }),
    enabled: !!userData,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const recordsQuery = useQuery<EcoDonationRecord[]>({
    queryKey: ["donation-records", userData?.id],
    queryFn: async () => {
      if (!userData) return [];
      return DonationService.getUserRecords(userData.id);
    },
    enabled: !!userData,
    staleTime: 1000 * 60 * 5,
  });

  const createCampaignMutation = useMutation({
    mutationFn: DonationService.createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donation-campaigns"],
      });
    },
  });

  const updateCampaignMutation = useMutation({
    mutationFn: ({
      campaignId,
      payload,
    }: {
      campaignId: string;
      payload: Parameters<typeof DonationService.updateCampaign>[1];
    }) => DonationService.updateCampaign(campaignId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donation-campaigns"],
      });
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: DonationService.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donation-campaigns"],
      });
    },
  });

  const donateMutation = useMutation({
    mutationFn: async ({
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
      queryClient.invalidateQueries({
        queryKey: ["donation-campaigns"],
      });
      queryClient.invalidateQueries({
        queryKey: ["donation-records", userData?.id],
      });
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

    loading: campaignsQuery.isLoading || recordsQuery.isLoading,
    error: campaignsQuery.error as Error | null,

    page,
    setPage,
    search,
    setSearch,
    totalPages,

    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    createCampaign: createCampaignMutation.mutateAsync,
    updateCampaign: updateCampaignMutation.mutateAsync,
    deleteCampaign: deleteCampaignMutation.mutateAsync,
    donate: (campaignId: string, amount: number) =>
      donateMutation.mutateAsync({ campaignId, amount }),
  };
};
