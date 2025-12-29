import { supabase } from "@/lib/supabase/client";
import type { ActivityLogParams } from "@/types/createActivityLog";

export class ActivityLogService {
  static async getLogs({
    page = 1,
    pageSize = 10,
    search = "",
    actorId,
    targetUserId,
    sortBy = "created_at",
    sortOrder = "desc",
  }: ActivityLogParams) {
    let query = supabase
      .from("activity_logs")
      .select("*", { count: "exact" })
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (actorId) {
      query = query.eq("actor_id", actorId);
    }

    if (targetUserId) {
      query = query.eq("target_user_id", targetUserId);
    }

    if (search) {
      query = query.or(
        `action.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: data ?? [],
      total: count ?? 0,
    };
  }

  static async createLog(payload: {
    actorId: string | number;
    targetUserId: string | number;
    action: string;
    metaData?: string | JSON;
    description?: string;
  }) {
    const { error } = await supabase.from("user_activity_logs").insert({
      actor_id: payload.actorId,
      target_user_id: payload.targetUserId,
      action: payload.action,
      metaData: payload.metaData,
      description: payload.description,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
}