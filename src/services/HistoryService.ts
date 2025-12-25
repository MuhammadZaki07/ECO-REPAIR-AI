import { supabase } from "@/lib/supabase/client";

export class HistoryService {
  static async getUserHistory(params: {
    userId: string;
    page?: number;
    limit?: number;
    search?: string;
  }) {
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
