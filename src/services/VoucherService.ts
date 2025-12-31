import { ENV } from "@/env";
import { supabase } from "@/lib/supabase/client";
import type { ParamsService } from "@/types/paramService";

export class VoucherService {
  static async getAllVouchers(
    params: ParamsService & { sortBy?: string; sortOrder?: "asc" | "desc" }
  ) {
    const {
      search = "",
      page = 1,
      limit = ENV.PAGE_SIZE,
      sortBy = "created_at",
      sortOrder = "desc",
    } = params;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("eco_vouchers")
      .select("*", { count: "exact" })
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(from, to);

    if (search) query = query.ilike("title", `%${search}%`);

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      data: data ?? [],
      total: count ?? 0,
      pages: Math.ceil((count ?? 0) / limit),
    };
  }

  static async createVoucher(payload: {
    title: string;
    eco_coin_cost: number;
    provider?: string;
    active?: boolean;
    start_date?: string;
    end_date?: string;
  }) {
    const { data, error } = await supabase
      .from("eco_vouchers")
      .insert([{ ...payload }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateVoucher(
    voucherId: string,
    payload: Partial<{
      title: string;
      eco_coin_cost: number;
      provider: string;
      active: boolean;
      start_date: string;
      end_date: string;
    }>
  ) {
    const { data, error } = await supabase
      .from("eco_vouchers")
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", voucherId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteVoucher(voucherId: string) {
    const { error } = await supabase
      .from("eco_vouchers")
      .delete()
      .eq("id", voucherId);

    if (error) throw error;
    return true;
  }

  static async getUserVoucherClaimsByVoucher(voucherId: string) {
    if (!voucherId) return [];

    const { data, error } = await supabase
      .from("eco_voucher_claims")
      .select(
        `
      user_id,
      voucher_code,
      claimed_at,
      users(*)
    `
      )
      .eq("voucher_id", voucherId)
      .order("claimed_at", { ascending: true });

    if (error) throw error;

    return (data ?? []).map((d: any) => ({
      user_id: d.user_id,
      voucher_code: d.voucher_code,
      claimed_at: d.claimed_at,
      user: d.users ?? {},
    }));
  }

  static async getVoucherById(voucherId: string) {
    const { data, error } = await supabase
      .from("eco_vouchers")
      .select("*")
      .eq("id", voucherId)
      .single();

    if (error) throw error;
    return data;
  }

  static async getActiveVouchers(params: ParamsService) {
    const { search = "", page = 1, limit = ENV.PAGE_SIZE } = params;

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

    return {
      voucher_code: data?.[0]?.voucher_code,
    };
  }
}
