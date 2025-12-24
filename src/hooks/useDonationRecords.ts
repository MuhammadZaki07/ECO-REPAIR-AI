import { useState, useEffect, useCallback } from "react";
import { DonationService } from "@/services/DonationService";

export interface DonationRecord {
  id: string;
  campaign_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

export const useDonationRecords = (userId?: string) => {
  const [records, setRecords] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecords = useCallback(async () => {
    if (!userId) {
      setRecords([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await DonationService.getUserDonations(userId);
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    loading,
    error,
    refetch: fetchRecords,
    isEmpty: !loading && records.length === 0,
  };
};
