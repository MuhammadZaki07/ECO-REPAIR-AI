export type ActivityLogParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  actorId?: string;
  targetUserId?: string;
  sortBy?: "created_at" | "action";
  sortOrder?: "asc" | "desc";
};