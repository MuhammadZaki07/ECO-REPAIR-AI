import { supabase } from "@/lib/supabase/client";

export interface EcoWallet {
  balance: number;
}

export class EcoWalletService {
  static async getWallet(userId: string): Promise<EcoWallet> {
    const { data, error } = await supabase
      .from("eco_wallets")
      .select("balance")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    // fallback utk user baru
    return {
      balance: data?.balance ?? 0,
    };
  }

  static async getHistory(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
    }
  ) {
    const { limit = 20, offset = 0 } = options || {};

    const { data, error } = await supabase
      .from("eco_transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data ?? [];
  }

  static async getMyWallet(): Promise<EcoWallet | null> {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) throw userError;

    const { data, error } = await supabase
      .from("eco_wallets")
      .select("*")
      .eq("user_id", userData.user.id)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    return data ?? null;
  }

  /** init wallet kalau belum ada */
  static async initWallet(): Promise<EcoWallet> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Unauthorized");

    const { data, error } = await supabase
      .from("eco_wallets")
      .insert({
        user_id: userData.user.id,
        balance: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
