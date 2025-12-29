import { supabase } from "@/lib/supabase/client";
import type { UserData } from "@/types/auth";
import type { ParamsService } from "@/types/paramService";

export class UserService {
  static async getUsers({
    page = 1,
    pageSize = 10,
    search = "",
    sortBy = "created_at",
    sortOrder = "desc",
  }: ParamsService) {
    let query = supabase
      .from("users")
      .select("*", { count: "exact" })
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range((page - 1) * pageSize, page * pageSize - 1);

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
      .single();

    if (error) throw new Error(error.message);
    return data as UserData;
  }

  static async blockUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from("users")
      .update({ is_blocked: true })
      .eq("id", userId);

    if (error) throw new Error(error.message);
  }

  static async unblockUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from("users")
      .update({ is_blocked: false })
      .eq("id", userId);

    if (error) throw new Error(error.message);
  }

  static async deleteUser(userId: string): Promise<void> {
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) {
      throw new Error(error.message);
    }
  }
}
