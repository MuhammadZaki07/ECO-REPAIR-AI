import { supabase } from "@/lib/supabase/client";

export interface DonationCampaign {
  id: string;
  title: string;
  description?: string;
  goal_eco_coin: number;
  current_eco_coin: number;
  is_active: boolean;
  created_at: string;
}

export class DonationService {
  /** ===== USER ===== */
  static async getActiveCampaigns(): Promise<DonationCampaign[]> {
    const { data, error } = await supabase
      .from("donation_campaigns")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async donate(campaignId: string, ecoCoin: number) {
    /**
     * NOTE:
     * ecoCoin boleh dipakai kalau:
     * - preset (10, 20, 50, 100)
     * - tetap divalidasi di DB
     */
    const { error } = await supabase.rpc("donate_to_campaign", {
      p_campaign_id: campaignId,
      p_eco_coin: ecoCoin,
    });

    if (error) throw error;
  }

  static async getDetail(id: string) {
    const { data: campaign } = await supabase
      .from("donation_campaigns")
      .select("*")
      .eq("id", id)
      .single();

    const { data: donors } = await supabase
      .from("donations")
      .select("id, amount, user:users(name)")
      .eq("campaign_id", id);

    const { data: me } = await supabase.auth.getUser();

    const userHasDonated = donors?.some(
      (d) => d.user?.name === me.user?.user_metadata?.name
    );

    return {
      ...campaign,
      donors:
        donors?.map((d) => ({
          id: d.id,
          name: d.user?.name ?? "Anonymous",
          amount: d.amount,
        })) ?? [],
      userHasDonated,
    };
  }

  /** ===== ADMIN ===== */
  static async getAllCampaigns(): Promise<DonationCampaign[]> {
    const { data, error } = await supabase
      .from("donation_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async getCampaignDonors(campaignId: string) {
    const { data, error } = await supabase
      .from("donation_transactions")
      .select(
        `
        eco_coin,
        created_at,
        users(username, avatar_url)
      `
      )
      .eq("campaign_id", campaignId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async createCampaign(
    payload: Omit<DonationCampaign, "id" | "created_at" | "current_eco_coin">
  ) {
    const { data, error } = await supabase
      .from("donation_campaigns")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateCampaign(id: string, payload: Partial<DonationCampaign>) {
    const { data, error } = await supabase
      .from("donation_campaigns")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
