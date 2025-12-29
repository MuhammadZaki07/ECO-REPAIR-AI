import { supabase } from "@/lib/supabase/client";
import type { ParamsService } from "@/types/paramService";
import { ActivityLogService } from "./activityLogService";
import type { UserData } from "@/types/auth";

export class UserService {
  static async getUsers({
    page = 1,
    pageSize = 10,
    search = "",
    sortBy = "created_at",
    sortOrder = "desc",
    includeDeleted = false,
    role,
  }: ParamsService) {
    let query = supabase
      .from("users")
      .select("*", { count: "exact" })
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (role) {
      query = query.eq("role", role);
    }

    if (includeDeleted) {
      query = query.not("deleted_at", "is", null);
    } else {
      query = query.is("deleted_at", null);
    }

    if (search) {
      query = query.or(`email.ilike.%${search}%,username.ilike.%${search}%`);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return { data: data ?? [], total: count ?? 0 };
  }

  static async getUserById(userId: string): Promise<UserData> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .is("deleted_at", null)
      .single();

    if (error) throw new Error(error.message);
    return data as UserData;
  }

  static async updateRoleToAdmin(targetUserId: string, actorId: string) {
    const { error } = await supabase
      .from("users")
      .update({ role: "admin" })
      .eq("id", targetUserId)
      .is("deleted_at", null);

    if (error) throw error;

    await ActivityLogService.createLog({
      actorId,
      targetUserId,
      action: "ROLE_UPDATED_TO_ADMIN",
      description: "User role updated to admin",
    });
  }

  static async updateRoleToUser(targetUserId: string, actorId: string) {
    const { error } = await supabase
      .from("users")
      .update({ role: "user" })
      .eq("id", targetUserId)
      .is("deleted_at", null);

    if (error) throw error;

    await ActivityLogService.createLog({
      actorId,
      targetUserId,
      action: "ROLE_DEMOTED_TO_USER",
      description: "User role updated to regular user",
    });
  }

  static async blockUser(targetUserId: string, actorId: string | number) {
    const { error } = await supabase
      .from("users")
      .update({ is_blocked: true })
      .eq("id", targetUserId)
      .is("deleted_at", null);

    if (error) throw error;

    await ActivityLogService.createLog({
      actorId,
      targetUserId,
      action: "USER_BLOCKED",
    });
  }

  static async unblockUser(targetUserId: string, actorId: string | number) {
    const { error } = await supabase
      .from("users")
      .update({ is_blocked: false })
      .eq("id", targetUserId)
      .is("deleted_at", null);

    if (error) throw error;

    await ActivityLogService.createLog({
      actorId,
      targetUserId,
      action: "USER_UNBLOCKED",
    });
  }

  static async deleteUser(targetUserId: string, actorId: string | number) {
    const { error } = await supabase
      .from("users")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: actorId,
      })
      .eq("id", targetUserId)
      .is("deleted_at", null);

    if (error) throw error;

    await ActivityLogService.createLog({
      actorId,
      targetUserId,
      action: "USER_SOFT_DELETED",
      description: "User soft deleted by admin",
    });
  }

  static async restoreUser(targetUserId: string, actorId: string | number) {
    const { error, data } = await supabase
      .from("users")
      .update({
        deleted_at: null,
        deleted_by: null,
      })
      .eq("id", targetUserId)
      .not("deleted_at", "is", null)
      .select("id")
      .single();

    if (error) throw error;

    if (!data) {
      throw new Error("User is not deleted or already restored");
    }

    await ActivityLogService.createLog({
      actorId,
      targetUserId,
      action: "USER_RESTORED",
      description: "User restored by admin",
    });
  }
}
