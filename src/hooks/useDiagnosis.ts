import { useState, useEffect, useCallback } from "react";
import type {
  DiagnosisRecord,
  HistorySummary,
  DiagnosisHookResult,
  HistoryHookResult,
  CreateDiagnosisHookResult,
  UseDiagnosisHistoryParams,
} from "@/types/diagnosis";
import { DiagnosisService } from "@/services/diagnosisService";

export const useDiagnosis = (diagnosisId?: string): DiagnosisHookResult => {
  const [data, setData] = useState<DiagnosisRecord | null>(null);
  const [isLoading, setIsLoading] = useState(!!diagnosisId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!diagnosisId) {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const record = await DiagnosisService.fetchById(diagnosisId);
        setData(record);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load diagnosis"
        );
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [diagnosisId]);

  return { data, isLoading, error };
};

export const useDiagnosisHistory = (
  params: UseDiagnosisHistoryParams
): HistoryHookResult & {
  page?: number;
  setPage?: (p: number) => void;
  search?: string;
  setSearch?: (s: string) => void;
  total?: number;
} => {
  const { userId, pageSize = 10, fromDate, toDate } = params;

  const [data, setData] = useState<HistorySummary[]>([]);
  const [page, setPage] = useState(params.page ?? 1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await DiagnosisService.fetchSummaries({
        userId,
        page,
        pageSize,
        search: params.search,
        fromDate,
        toDate,
      });

      setData(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load history");
    } finally {
      setIsLoading(false);
    }
  }, [userId, page, pageSize, params.search, fromDate, toDate]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchHistory,
    page,
    setPage,
    total,
  };
};

function isValidDiagnosis(aiData: any): boolean {
  if (!aiData?.sections) return false;
  const steps = aiData.sections.find((s: any) => s.tag === "STEPS");
  return Array.isArray(steps?.items) && steps.items.length > 0;
}

export const useCreateDiagnosis = (): CreateDiagnosisHookResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (userId: string, description: string, aiResponse: any) => {
      if (!userId || !description) return;

      if (!isValidDiagnosis(aiResponse)) {
        console.warn("Skipped saving invalid diagnosis");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        return await DiagnosisService.create(userId, description, aiResponse);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create diagnosis"
        );
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return { isSubmitting, error, create };
};

export const useDeleteDiagnosis = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (id: string) => {
    setIsDeleting(true);
    setError(null);

    try {
      await DiagnosisService.delete(id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete diagnosis"
      );
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return { isDeleting, error, remove };
};
