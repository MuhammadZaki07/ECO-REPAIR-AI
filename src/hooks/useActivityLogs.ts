import { useQuery } from "@tanstack/react-query";
import { ActivityLogService } from "@/services/activityLogService";
import type { ActivityLogParams } from "@/types/CreateActivityLog";

export function useActivityLogs({
  page = 1,
  pageSize = 10,
  search = "",
  actorId,
  targetUserId,
  sortBy = "created_at",
  sortOrder = "desc",
}: ActivityLogParams) {
  return useQuery({
    queryKey: [
      "activity-logs",
      page,
      pageSize,
      search,
      actorId,
      targetUserId,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      ActivityLogService.getLogs({
        page,
        pageSize,
        search,
        actorId,
        targetUserId,
        sortBy,
        sortOrder,
      }),
    keepPreviousData: true,
  });
}
