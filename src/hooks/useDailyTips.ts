import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { DailyTipService } from "@/services/DailyTipService";

export const useDailyTips = ({
  search = "",
  limit = 10,
  page = 1,
  startDate,
  endDate,
} = {}) => {
  const [tips, setTips] = useState<any[]>([]);
  const [dailyTip, setDailyTip] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTips = useCallback(async () => {
    setLoading(true);
    try {
      const data = await DailyTipService.getTips({
        search,
        limit,
        page,
        startDate,
        endDate,
      });
      setTips(data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [search, limit, page, startDate, endDate]);

  const fetchDailyTip = useCallback(async () => {
    try {
      const tip = await DailyTipService.getRandomTip();
      setDailyTip(tip);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const createTip = useCallback(async (content: string) => {
    const tip = await DailyTipService.createTip(content);
    fetchTips();
    fetchDailyTip();
    return tip;
  }, [fetchTips, fetchDailyTip]);

  const updateTip = useCallback(async (id: string, content: string) => {
    const tip = await DailyTipService.updateTip(id, content);
    fetchTips();
    fetchDailyTip();
    return tip;
  }, [fetchTips, fetchDailyTip]);

  const deleteTip = useCallback(async (id: string) => {
    await DailyTipService.deleteTip(id);
    fetchTips();
    fetchDailyTip();
  }, [fetchTips, fetchDailyTip]);

  useEffect(() => {
    fetchTips();
    fetchDailyTip();

    const sub = supabase
      .channel("daily_tips_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "daily_tips" },
        () => {
          fetchTips();
          fetchDailyTip();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [fetchTips, fetchDailyTip]);

return {
  tips,
  dailyTip,
  loading,
  error,
  fetchTips,
  fetchDailyTip,
  createTip,
  updateTip,
  deleteTip,
};

};
