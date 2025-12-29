import { supabase } from "@/lib/supabase/client";
import type { LeaderboardQuery } from "@/types/leaderboard";


export class LeaderboardService {
  static async getLeaderboardTable(query: LeaderboardQuery = {}) {
    const {
      page = 1,
      pageSize = 10,
      sortBy = "xp",
      order = "desc",
      search,
    } = query;

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let qb = supabase
      .from("leaderboard_view")
      .select("*", { count: "exact" });

    if (search) {
      qb = qb.ilike("username", `%${search}%`);
    }

    qb = qb.order(sortBy, { ascending: order === "asc" });
    qb = qb.range(from, to);

    const { data, error, count } = await qb;
    if (error) throw error;

    return {
      data: data ?? [],
      total: count ?? 0,
      page,
      pageSize,
    };
  }

  static async getTopContributors(limit = 5) {
    const { data, error } = await supabase
      .from("leaderboard_view")
      .select("*")
      .order("xp", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data ?? [];
  }

  static async getUserXP(userId: string) {
    const { data, error } = await supabase
      .from("user_rewards")
      .select("xp")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return { xp: data?.xp ?? 0 };
  }
}
