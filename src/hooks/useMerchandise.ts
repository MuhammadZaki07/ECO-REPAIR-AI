import { MerchandiseService, type EcoMerch } from "@/services/MerchandiseService";
import { useState, useEffect, useCallback } from "react";

export const useMerch = () => {
  const [merch, setMerch] = useState<EcoMerch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMerch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await MerchandiseService.getAllMerch();
      setMerch(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMerch();
  }, [fetchMerch]);

  return {
    merch,
    loading,
    error,
    refetch: fetchMerch,
    isEmpty: !loading && merch.length === 0,
  };
};
