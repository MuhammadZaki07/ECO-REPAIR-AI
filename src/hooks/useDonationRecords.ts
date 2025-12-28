import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export const useDonationRecords = (userId?: string) => {
  const {
    data: records = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["donation-records", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("eco_donation_records")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data ?? [];
    },
    enabled: !!userId,
  });

  return {
    records,
    loading,
    refetch,
  };
};
