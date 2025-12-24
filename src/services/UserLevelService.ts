import { supabase } from "@/lib/supabase/client";

export interface EcoLevel {
  id: number;
  name: string;
  required_ec_coin: number; // jumlah EC untuk level ini
}

export interface UserLevel {
  user_id: string;
  level_id: number | null;
  level_name?: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge: string;
  created_at: string;
}

export class UserLevelService {
  // Ambil level saat ini user
  static async getUserLevel(userId: string): Promise<UserLevel | null> {
    const { data, error } = await supabase
      .from("user_eco_levels")
      .select("*, level_id(name, required_ec_coin)")
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return data;
  }

  // Ambil semua badge user
  static async getUserBadges(userId: string): Promise<UserBadge[]> {
    const { data, error } = await supabase
      .from("user_badges")
      .select("*")
      .eq("user_id", userId);

    if (error) return [];
    return data ?? [];
  }

  // Hitung level baru user berdasarkan total EC dan badge
  static async updateUserLevel(userId: string, totalEcoCoin: number) {
    const { data: levels, error } = await supabase
      .from("eco_levels")
      .select("*")
      .order("required_ec_coin", { ascending: true });

    if (error || !levels) return;

    // Tentukan level yang sesuai
    const newLevel = levels
      .filter((lvl) => totalEcoCoin >= lvl.required_ec_coin)
      .pop();

    if (!newLevel) return;

    await supabase
      .from("user_eco_levels")
      .upsert({
        user_id: userId,
        level_id: newLevel.id,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  }

  // Tambah badge ke user
  static async addBadge(userId: string, badge: string) {
    const { error } = await supabase.from("user_badges").insert([{ user_id: userId, badge }]);
    if (error) throw error;
  }
}
