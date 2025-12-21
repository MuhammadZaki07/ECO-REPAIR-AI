import { supabase } from "@/lib/supabase/client";

export class LeaderboardService {
  static async getTopContributors(limit = 5, search?: string) {
    const { data, error } = await supabase
      .from("user_rewards")
      .select(`
        user_id,
        xp,
        users!inner(id, username)
      `)
      .order("xp", { ascending: false })
      .limit(limit);

    if (error) throw error;

    let results = data?.map((row: any) => ({
      id: row.user_id,
      username: row.users.username,
      xp: row.xp,
    })) ?? [];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(u => u.username.toLowerCase().includes(q));
    }

    return results;
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
