import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export const useDonationRecords = (userId?: string) => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    if (!userId) return setLoading(false);

    setLoading(true);
    const { data, error } = await supabase
      .from("eco_donation_records")
      .select("*")
      .eq("user_id", userId);

    if (!error) setRecords(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, [userId]);

  return { records, loading, refetch: fetchRecords };
};
