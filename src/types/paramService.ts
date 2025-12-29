export interface ParamsService {
  page?: number;
  pageSize?: number;
  search?: string;
  limit?: number;
  userId?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
