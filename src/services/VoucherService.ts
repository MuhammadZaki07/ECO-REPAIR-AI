import { supabase } from "@/lib/supabase/client";

export class VoucherService {
  static async getActiveVouchers(params: {
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const PAGE_SIZE =
      Number(import.meta.env.VITE_PAGE_SIZE) > 0
        ? Number(import.meta.env.VITE_PAGE_SIZE)
        : 9;

    const { search = "", page = 1, limit = PAGE_SIZE } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("eco_vouchers")
      .select("*", { count: "exact" })
      .eq("active", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      data: data ?? [],
      total: count ?? 0,
      pages: Math.ceil((count ?? 0) / limit),
    };
  }

  static async getUserVoucherClaims(userId: string) {
    const { data, error } = await supabase
      .from("eco_voucher_claims")
      .select("voucher_id, voucher_code, claimed_at")
      .eq("user_id", userId);

    if (error) throw error;
    return data ?? [];
  }

  static async claimVoucher(userId: string, voucherId: string) {
    const { data, error } = await supabase.rpc("claim_voucher", {
      p_user_id: userId,
      p_voucher_id: voucherId,
    });

    if (error) throw error;
    return data[0];
  }
}
