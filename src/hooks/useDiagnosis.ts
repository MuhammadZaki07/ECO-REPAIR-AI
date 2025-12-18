import { useState, useEffect, useCallback } from "react";
import type { DiagnosisRecord, HistorySummary } from "@/types/diagnosis";
import type {
  CreateDiagnosisHookResult,
  DiagnosisHookResult,
  HistoryHookResult,
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

    const loadDiagnosis = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const record = await DiagnosisService.fetchById(diagnosisId);
        setData(record);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal memuat diagnosis."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadDiagnosis();
  }, [diagnosisId]);

  return { data, isLoading, error };
};

export const useDiagnosisHistory = (): HistoryHookResult => {
  const [data, setData] = useState<HistorySummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const records = await DiagnosisService.fetchSummaries();
      setData(records);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat riwayat diagnosis."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return { data, isLoading, error, refetch: loadHistory };
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
        console.log("Skip save: bukan diagnosis valid");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        return await DiagnosisService.create(userId, description, aiResponse);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal membuat diagnosis."
        );
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
  const [error, setError] = useState<string | number | null>(null);

  const remove = useCallback(async (id: string | number) => {
    setIsDeleting(true);
    setError(null);
    try {
      await DiagnosisService.delete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus.");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return { isDeleting, error, remove };
};
