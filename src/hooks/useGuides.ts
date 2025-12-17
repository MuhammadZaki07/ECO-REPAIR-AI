import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useGuides = (keyword?: string) => {
  return useQuery({
    queryKey: ["guides", keyword],
    queryFn: async () => {
      if (!keyword) return [];

      let query = supabase.from("guides").select("*");
      query = query.or(`title.ilike.%${keyword}%,category.ilike.%${keyword}%`);

      const { data, error } = await query.limit(3);

      if (error) throw error;
      return data || [];
    },
    enabled: !!keyword,
  });
};