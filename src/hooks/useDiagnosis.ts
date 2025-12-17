import { useState, useEffect, useCallback } from "react";
import {
  fetchDiagnosisById,
  fetchDiagnosisSummaries,
  createDiagnosis,
  deleteDiagnosis,
} from "@/services/diagnosis/diagnosisService";

import type {
  DiagnosisRecord,
  HistorySummary,
} from "@/services/diagnosis/diagnosisService";


interface DiagnosisHookResult {
  data: DiagnosisRecord | null;
  isLoading: boolean;
  error: string | null;
}

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
        const record = await fetchDiagnosisById(diagnosisId);
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

interface HistoryHookResult {
  data: HistorySummary[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDiagnosisHistory = (): HistoryHookResult => {
  const [data, setData] = useState<HistorySummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const records = await fetchDiagnosisSummaries();
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

  return {
    data,
    isLoading,
    error,
    refetch: loadHistory,
  };
};

interface CreateDiagnosisHookResult {
  isSubmitting: boolean;
  error: string | null;
  create: (
    userId: string,
    description: string,
    aiResponse: any
  ) => Promise<number | undefined>;
}

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
        return await createDiagnosis(userId, description, aiResponse);
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
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (id: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteDiagnosis(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus.");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return { isDeleting, error, remove };
};
