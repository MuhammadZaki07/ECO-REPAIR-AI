import { useState } from "react";
import type {
  DiagnosisRecord,
  HistorySummary,
  DiagnosisHookResult,
  HistoryHookResult,
  CreateDiagnosisHookResult,
  UseDiagnosisHistoryParams,
} from "@/types/diagnosis";
import { DiagnosisService } from "@/services/diagnosisService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDiagnosis = (diagnosisId?: string): DiagnosisHookResult => {
  const query = useQuery<DiagnosisRecord>({
    queryKey: ["diagnosis", diagnosisId],
    queryFn: () => DiagnosisService.fetchById(diagnosisId!),
    enabled: !!diagnosisId,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
  };
};

export const useDiagnosisHistory = (
  params: UseDiagnosisHistoryParams
): HistoryHookResult & {
  page: number;
  setPage: (p: number) => void;
  total: number;
} => {
  const { userId, pageSize = 10, fromDate, toDate, search } = params;
  const [page, setPage] = useState(params.page ?? 1);

  const query = useQuery<{
    data: HistorySummary[];
    total: number;
  }>({
    queryKey: [
      "diagnosis-history",
      userId,
      page,
      pageSize,
      search,
      fromDate,
      toDate,
    ],
    queryFn: () =>
      DiagnosisService.fetchSummaries({
        userId: userId!,
        page,
        pageSize,
        search,
        fromDate,
        toDate,
      }),
    enabled: !!userId,
    keepPreviousData: true,
  });

  return {
    data: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
    page,
    setPage,
  };
};

function isValidDiagnosis(aiData: any): boolean {
  if (!aiData?.sections) return false;
  const steps = aiData.sections.find((s: any) => s.tag === "STEPS");
  return Array.isArray(steps?.items) && steps.items.length > 0;
}

export const useCreateDiagnosis = (): CreateDiagnosisHookResult => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      description,
      aiResponse,
    }: {
      userId: string;
      description: string;
      aiResponse: any;
    }) => {
      if (!isValidDiagnosis(aiResponse)) {
        console.warn("Skipped saving invalid diagnosis");
        return;
      }
      return DiagnosisService.create(userId, description, aiResponse);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["diagnosis-history", variables.userId],
      });
    },
  });

  return {
    isSubmitting: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    create: (userId, description, aiResponse) =>
      mutation.mutateAsync({ userId, description, aiResponse }),
  };
};

export const useDeleteDiagnosis = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => DiagnosisService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["diagnosis-history"],
      });
    },
  });

  return {
    isDeleting: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    remove: mutation.mutateAsync,
  };
};
