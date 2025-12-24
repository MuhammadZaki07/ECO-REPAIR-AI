import { supabase } from "@/lib/supabase/client";

export interface ImpactMining {
  id: string;
  user_id: string;
  progress: number;
  remaining_likes: number;
  last_claimed: string | null;
  created_at: string;
  updated_at: string;
}

export class ImpactMiningService {
  static async getByUser(userId: string): Promise<ImpactMining | null> {
    const { data, error } = await supabase
      .from("impact_mining")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProgress(userId: string, progress: number, remainingLikes: number) {
    const { data, error } = await supabase
      .from("impact_mining")
      .upsert({
        user_id: userId,
        progress,
        remaining_likes: remainingLikes,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async claimReward(userId: string) {
    const { data, error } = await supabase
      .from("impact_mining")
      .update({ remaining_likes: 0, last_claimed: new Date().toISOString() })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
