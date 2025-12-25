import { useState, useCallback, useEffect } from "react";
import { HistoryService } from "@/services/HistoryService";

export const useHistory = (
  userId?: string,
  page = 1,
  limit = 6,
  search = ""
) => {
  const [history, setHistory] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const { data, total } = await HistoryService.getUserHistory({
        userId,
        page,
        limit,
        search,
      });
      setHistory(data);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }, [userId, page, limit, search]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    total,
    pages: Math.ceil(total / limit),
    isEmpty: !loading && history.length === 0,
  };
};
