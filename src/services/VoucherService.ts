import { supabase } from "@/lib/supabase/client";
import type { EcoVoucher, EcoVoucherClaim } from "@/types/voucher";

export class VoucherService {
  static async getActiveVouchers(): Promise<EcoVoucher[]> {
    const { data, error } = await supabase
      .from("eco_vouchers")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async getUserClaims(userId: string): Promise<EcoVoucherClaim[]> {
    const { data, error } = await supabase
      .from("eco_voucher_claims")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data ?? [];
  }

  static async claimVoucher(
    userId: string,
    voucherId: string
  ): Promise<EcoVoucherClaim> {
    const { data, error } = await supabase
      .from("eco_voucher_claims")
      .insert({ user_id: userId, voucher_id: voucherId })
      .select("*")
      .single();

    if (error) throw error;
    return data;
  }
}
