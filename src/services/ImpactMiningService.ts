import { supabase } from "@/lib/supabase/client";
import type { ImpactMining } from "@/types/impact";

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
