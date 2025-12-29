export interface ImpactMining {
  id: string;
  user_id: string;
  progress: number;
  remaining_likes: number;
  last_claimed: string | null;
  created_at: string;
  updated_at: string;
}