// src/services/EcoHistoryService.ts
import { supabase } from "@/lib/supabase/client";

export interface EcoHistoryItem {
  id: string;
  action: string;
  eco_coin: number;
  created_at: string;
  ref_table?: string | null;
  ref_id?: string | null;

  // joined data (optional)
  voucher?: {
    title: string;
  };
  reward?: {
    title: string;
  };
  campaign?: {
    title: string;
  };
}

export class EcoHistoryService {
  static async getMyHistory(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from("eco_transactions")
      .select(
        `
        id,
        action,
        eco_coin,
        ref_table,
        ref_id,
        created_at,

        eco_vouchers(title),
        rewards(title),
        donation_campaigns(title)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data ?? [];
  }
}
