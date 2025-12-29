export type LeaderboardRow = {
  id: string;
  username: string;
  avatar_url?: string | null;
  xp: number;
  contributions: number;
};

export type LeaderboardSortBy = "xp" | "username" | "contributions";
export type SortOrder = "asc" | "desc";

export interface LeaderboardQuery {
  page?: number;
  pageSize?: number;
  sortBy?: LeaderboardSortBy;
  order?: SortOrder;
  search?: string;
}
