import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useGuides = (keyword?: string) => {
  return useQuery({
    queryKey: ["guides", keyword],
    queryFn: async () => {
      if (!keyword) return [];

      const { data, error } = await supabase
        .from("guides")
        .select("*")
        .or(`title.ilike.%${keyword}%,category.ilike.%${keyword}%`)
        .limit(3);

      if (error) throw error;
      return data ?? [];
    },
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};
