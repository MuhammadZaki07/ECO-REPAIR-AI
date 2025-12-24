export interface UIVoucher {
  id: string;
  title: string;
  cost: number;
  type: string;
  voucherCode?: string | null;
}

export interface EcoVoucher {
  id: string;
  title: string;
  eco_coin_cost: number;
  provider?: string | null;
  active: boolean;
  voucher_code?: string | null;
  created_at: string;
}

export interface EcoVoucherClaim {
  id: string;
  voucher_id: string;
  user_id: string;
  claimed_at: string;
}