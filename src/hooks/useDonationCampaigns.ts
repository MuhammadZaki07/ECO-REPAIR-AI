import { supabase } from "@/lib/supabase/client";

export interface DonationCampaignSummary {
  id: string;
  title: string;
  description?: string;
  goal_eco_coin: number;
  current_eco_coin: number;
}

export async function getActiveDonationCampaigns(): Promise<
  DonationCampaignSummary[]
> {
  const { data, error } = await supabase
    .from("donation_campaigns")
    .select(`
      id,
      title,
      description,
      goal_eco_coin,
      current_eco_coin
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
