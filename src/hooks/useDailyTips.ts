import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { DailyTipService } from "@/services/DailyTipService";

type UseDailyTipsParams = {
  search?: string;
  limit?: number;
  page?: number;
  startDate?: string;
  endDate?: string;
};

export const useDailyTips = ({
  search = "",
  limit = 10,
  page = 1,
  startDate,
  endDate,
}: UseDailyTipsParams = {}) => {
  const queryClient = useQueryClient();

  // list tips
  const tipsQuery = useQuery({
    queryKey: ["daily-tips", search, limit, page, startDate, endDate],
    queryFn: () =>
      DailyTipService.getTips({
        search,
        limit,
        page,
        startDate,
        endDate,
      }),
    keepPreviousData: true,
  });

  // random daily tip
  const dailyTipQuery = useQuery({
    queryKey: ["daily-tip-random"],
    queryFn: DailyTipService.getRandomTip,
    staleTime: 1000 * 60 * 5,
  });

  // mutations
  const createMutation = useMutation({
    mutationFn: (content: string) =>
      DailyTipService.createTip(content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["daily-tips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["daily-tip-random"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      content,
    }: {
      id: string;
      content: string;
    }) => DailyTipService.updateTip(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["daily-tips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["daily-tip-random"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      DailyTipService.deleteTip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["daily-tips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["daily-tip-random"],
      });
    },
  });

  // realtime sync
  useEffect(() => {
    const sub = supabase
      .channel("daily_tips_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "daily_tips" },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["daily-tips"],
          });
          queryClient.invalidateQueries({
            queryKey: ["daily-tip-random"],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [queryClient]);

  return {
    tips: tipsQuery.data ?? [],
    dailyTip: dailyTipQuery.data ?? null,

    loading:
      tipsQuery.isLoading || dailyTipQuery.isLoading,
    error: tipsQuery.error ?? dailyTipQuery.error,

    createTip: (content: string) =>
      createMutation.mutateAsync(content),

    updateTip: (id: string, content: string) =>
      updateMutation.mutateAsync({ id, content }),

    deleteTip: (id: string) =>
      deleteMutation.mutateAsync(id),
  };
};
