import { supabase } from "@/lib/supabase/client";
import type { Reward, RewardType } from "@/types/reward";


export class RewardService {
  static async getActiveRewards(type?: RewardType): Promise<Reward[]> {
    let qb = supabase
      .from("rewards")
      .select("*")
      .eq("is_active", true);

    if (type) qb = qb.eq("type", type);

    const { data, error } = await qb.order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return data ?? [];
  }

  static async getAll(): Promise<Reward[]> {
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async create(
    payload: Omit<Reward, "id" | "created_at">
  ): Promise<Reward> {
    const { data, error } = await supabase
      .from("rewards")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(
    id: string,
    payload: Partial<Reward>
  ): Promise<Reward> {
    const { data, error } = await supabase
      .from("rewards")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from("rewards")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
