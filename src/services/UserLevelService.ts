import { supabase } from "@/lib/supabase/client";
import type { UserLevel, UserBadge } from "@/types/levelUser";

export class UserLevelService {
  static async getUserLevel(userId: string): Promise<UserLevel | null> {
    const { data, error } = await supabase
      .from("user_eco_levels")
      .select("*, level_id(name, min_total_eco, badge)")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) return null;
    return data;
  }

  static async getUserBadges(userId: string): Promise<UserBadge[]> {
    const { data, error } = await supabase
      .from("user_badges")
      .select("*")
      .eq("user_id", userId);

    if (error) return [];
    return data ?? [];
  }

  static async updateUserLevel(userId: string, totalEcoCoin: number) {
    const { data: levels, error } = await supabase
      .from("eco_levels")
      .select("*")
      .order("min_total_eco", { ascending: true });

    if (error || !levels) return;

    const newLevel = levels
      .filter((lvl) => totalEcoCoin >= lvl.min_total_eco)
      .pop();

    await supabase.from("user_eco_levels").upsert({
      user_id: userId,
      level_id: newLevel?.id ?? null,
      updated_at: new Date().toISOString(),
    });
  }

  static async addBadge(userId: string, badge: string) {
    const { error } = await supabase
      .from("user_badges")
      .insert([{ user_id: userId, badge }]);
    if (error) throw error;
  }
}
