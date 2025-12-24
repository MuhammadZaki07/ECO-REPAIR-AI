import { useCallback, useEffect, useState } from "react";
import { EcoHistoryService, type EcoHistoryItem } from "@/services/EcoHistoryService";

export const useEcoHistory = (userId?: string) => {
  const [items, setItems] = useState<EcoHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!userId) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await EcoHistoryService.getMyHistory(userId);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history: items,
    loading,
    error,
    refetch: fetchHistory,
    isEmpty: !loading && items.length === 0,
  };
};
