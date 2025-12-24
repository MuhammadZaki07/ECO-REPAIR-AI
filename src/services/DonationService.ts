import { supabase } from "@/lib/supabase/client";

export interface DonationCampaign {
  id: string;
  title: string;
  description?: string | null;
  goal_eco_coin: number;
  current_eco_coin: number;
  created_at: string;
  updated_at: string;
}

export interface DonationRecord {
  id: string;
  campaign_id: string;
  user_id: string;
  amount: number;
  created_at: string;
  user_name?: string;
}

export class DonationService {
  static async getAllCampaigns(): Promise<DonationCampaign[]> {
    const { data, error } = await supabase
      .from("eco_donation_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async getCampaignDetail(id: string) {
    const { data, error } = await supabase
      .from("eco_donation_campaigns")
      .select("*, donors:eco_donation_records(*, user:users(name))")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async donate(
    campaignId: string,
    userId: string,
    amount: number
  ): Promise<void> {
    const { data, error } = await supabase.rpc("donate_to_campaign", {
      p_campaign_id: campaignId,
      p_user_id: userId,
      p_amount: amount,
    });

    if (error) throw error;
    return data;
  }

   static async getUserDonations(userId: string): Promise<DonationRecord[]> {
    const { data, error } = await supabase
      .from("eco_donation_records")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }
}
