export type EcoDonationCampaign = {
  id: string;
  title: string;
  description: string | null;
  goal_amount: number;
  current_amount: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  current_eco_coin: number;
  goal_eco_coin: number;
};

export type EcoDonationRecord = {
  id: string;
  campaign_id: string;
  user_id: string;
  amount: number;
  created_at: string;
  updated_at: string;
};

export type CampaignWithDonors = EcoDonationCampaign & {
  donors: {
    id: string;
    auth_id: string | null;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    role: string | null;
    created_at: string;
    updated_at: string;
    bio: string | null;
    location: string | null;
    amount: number;
  }[];
};

export interface DonationCampaignForm {
  title: string;
  description?: string;
  goal_eco_coin: number;
  current_eco_coin: number;
  is_active: boolean;
  image_file?: File | null;
  remove_image?: boolean;
}

export interface DonationModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData?: Partial<DonationCampaignForm> & { id?: string; image_url?: string };
  onSubmit: (data: DonationCampaignForm) => void | Promise<void>;
  onSuccess?: () => void;
  schema?: any;
}

export interface GetDonorsParams {
  campaignId?: string | null;
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: "amount" | "created_at";
  sortOrder?: "asc" | "desc";
}

