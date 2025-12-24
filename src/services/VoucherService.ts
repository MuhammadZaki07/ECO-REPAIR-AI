import { supabase } from "@/lib/supabase/client";

export interface EcoVoucher {
  id: string;
  title: string;
  eco_coin_cost: number;
  provider?: string | null;
  active: boolean;
  voucher_code?: string | null;
  claimed_by?: string | null;
  claimed_at?: string | null;
  created_at: string;
}

export class VoucherService {
  /** ===== USER ===== */

  static async getActiveVouchers(): Promise<EcoVoucher[]> {
    const { data, error } = await supabase
      .from("eco_vouchers")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async claimVoucher(voucherId: string): Promise<{ voucher_code: string }> {
    const { data, error } = await supabase.rpc("claim_voucher", {
      p_voucher_id: voucherId,
    });

    if (error) throw error;

    // RPC return table → array
    return data[0];
  }

  /** ===== ADMIN (optional nanti) ===== */
}
