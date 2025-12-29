import { supabase } from "@/lib/supabase/client";
import type { ParamsService } from "@/types/paramService";

export class HistoryService {
  static async getUserHistory(params: ParamsService) {
    const { userId, page = 1, limit = 6, search = "" } = params;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("eco_wallet_transactions")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.ilike("description", `%${search}%`);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    return {
      data: data ?? [],
      total: count ?? 0,
    };
  }
}
