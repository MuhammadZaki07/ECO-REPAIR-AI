import { supabase } from "@/lib/supabase/client";

export class DailyTipService {
  static async getTips({
    search = "",
    limit = 10,
    page = 1,
    startDate,
    endDate,
  }: {
    search?: string;
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
  } = {}) {
    let query = supabase.from("daily_tips").select("*");

    if (search) query = query.ilike("content", `%${search}%`);
    if (startDate) query = query.gte("created_at", startDate);
    if (endDate) query = query.lte("created_at", endDate);

    query = query
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getRandomTip() {
    const { data, error } = await supabase.rpc("get_random_daily_tip");
    if (error) throw error;
    return data?.[0] ?? null;
  }

  static async createTip(content: string) {
    const { data, error } = await supabase
      .from("daily_tips")
      .insert([{ content }])
      .select();
    if (error) throw error;
    return data?.[0];
  }

  static async updateTip(id: string, content: string) {
    const { data, error } = await supabase
      .from("daily_tips")
      .update({ content })
      .eq("id", id)
      .select();
    if (error) throw error;
    return data?.[0];
  }

  static async deleteTip(id: string) {
    const { error } = await supabase.from("daily_tips").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
}
