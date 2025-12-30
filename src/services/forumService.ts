import { supabase } from "@/lib/supabase/client";
import type {
  Forum,
  ForumDashboardResponse,
  ForumReply,
  Timeframe,
} from "@/types/forum";
import type { ParamsService } from "@/types/paramService";
import { timeframeToDays } from "@/utils/timeframe";
import type { SerializedEditorState } from "lexical";

const BASE_FORUM_SELECT = `
  id,
  title,
  content,
  status,
  replies_count,
  likes_count,
  created_at,
  updated_at,
  user_id,
  category:categories (
    id,
    name
  ),
  author:users!inner (
    username,
    first_name,
    last_name,
    avatar_url
  )
`;

export class ForumService {
  static async getForums({
    page = 1,
    pageSize = 10,
    search = "",
  }: ParamsService = {}): Promise<{
    data: Forum[];
    total: number;
  }> {
    let query = supabase
      .from("forums")
      .select(BASE_FORUM_SELECT, { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) query = query.ilike("title", `%${search}%`);

    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  }

  static async getDashboard(
    timeframe: Timeframe
  ): Promise<ForumDashboardResponse> {
    const days = timeframeToDays(timeframe);

    const { data, error } = await supabase.rpc("get_forum_dashboard", {
      p_days: days,
    });

    if (error) {
      console.error("[ForumService.getDashboard]", error);
      throw error;
    }

    return data as ForumDashboardResponse;
  }

  static async getForumsByUser(
    userId: string,
    {
      page = 1,
      pageSize = 10,
      search = "",
    }: { page?: number; pageSize?: number; search?: string } = {}
  ): Promise<{ data: Forum[]; total: number }> {
    let query = supabase
      .from("forums")
      .select(BASE_FORUM_SELECT, { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) query = query.ilike("title", `%${search}%`);

    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  }

  static async getForumById(forumId: string): Promise<Forum> {
    const { data, error } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT)
      .eq("id", forumId)
      .single();
    if (error) throw error;
    return data as Forum;
  }

  static async getTrendingForums({ page = 1, pageSize = 10 } = {}): Promise<{
    data: Forum[];
    total: number;
  }> {
    const { data, error, count } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT, { count: "exact" })
      .order("likes_count", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  }

  static async getSolvedForums({ page = 1, pageSize = 10 } = {}): Promise<{
    data: Forum[];
    total: number;
  }> {
    const { data, error, count } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT, { count: "exact" })
      .eq("status", "solved")
      .order("updated_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  }

  static async createForum(
    userId: string,
    title: string,
    category_id: number | string | null,
    content: SerializedEditorState
  ): Promise<Forum> {
    const { data, error } = await supabase
      .from("forums")
      .insert({ user_id: userId, title, category_id, content })
      .select(BASE_FORUM_SELECT)
      .single();
    if (error) throw error;
    return data as Forum;
  }

  static async updateForum(
    forumId: string,
    title: string,
    category_id: number | string | null,
    content: SerializedEditorState
  ): Promise<Forum> {
    const { data, error } = await supabase
      .from("forums")
      .update({ title, category_id, content })
      .eq("id", forumId)
      .select(BASE_FORUM_SELECT)
      .single();
    if (error) throw error;
    return data as Forum;
  }

  static async deleteForum(forumId: string): Promise<void> {
    const { error } = await supabase.from("forums").delete().eq("id", forumId);
    if (error) throw error;
  }

  static async getReplies(forumId: string): Promise<ForumReply[]> {
    const { data, error } = await supabase
      .from("forum_replies")
      .select(
        `
        id,
        forum_id,
        content,
        created_at,
        user_id,
        likes_count,
        author:users (
          username,
          avatar_url
        )
      `
      )
      .eq("forum_id", forumId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data ?? [];
  }

  static async postReply(
    forumId: string,
    userId: string,
    content: string
  ): Promise<ForumReply> {
    const { data, error } = await supabase
      .from("forum_replies")
      .insert({ forum_id: forumId, user_id: userId, content })
      .select(
        `
        id,
        forum_id,
        content,
        created_at,
        user_id,
        likes_count,
        author:users (username, avatar_url)
      `
      )
      .single();
    if (error) throw error;
    return data as ForumReply;
  }

  static async updateReply(
    replyId: string,
    content: string
  ): Promise<ForumReply> {
    const { data, error } = await supabase
      .from("forum_replies")
      .update({ content })
      .eq("id", replyId)
      .select(
        `
        id,
        forum_id,
        content,
        created_at,
        user_id,
        likes_count,
        author:users (
          username,
          avatar_url
        )
      `
      )
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteReply(replyId: string): Promise<void> {
    const { error } = await supabase
      .from("forum_replies")
      .delete()
      .eq("id", replyId);
    if (error) throw error;
  }

  static async toggleForumLike(
    forumId: string,
    userId: string
  ): Promise<Forum> {
    const { data: existing } = await supabase
      .from("forum_likes")
      .select("*")
      .eq("forum_id", forumId)
      .eq("user_id", userId)
      .maybeSingle();
    if (existing) {
      await supabase
        .from("forum_likes")
        .delete()
        .eq("forum_id", forumId)
        .eq("user_id", userId);
    } else {
      await supabase
        .from("forum_likes")
        .insert({ forum_id: forumId, user_id: userId });
    }

    const { data, error } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT)
      .eq("id", forumId)
      .single();
    if (error) throw error;
    return data as Forum;
  }

  static async toggleReplyLike(
    replyId: string,
    userId: string
  ): Promise<number> {
    const { data: existing } = await supabase
      .from("forum_reply_likes")
      .select("*")
      .eq("reply_id", replyId)
      .eq("user_id", userId)
      .maybeSingle();
    if (existing) {
      await supabase
        .from("forum_reply_likes")
        .delete()
        .eq("reply_id", replyId)
        .eq("user_id", userId);
      return -1;
    } else {
      await supabase
        .from("forum_reply_likes")
        .insert({ reply_id: replyId, user_id: userId });
      return 1;
    }
  }

  static async getForumByIdWithUserLikes(
    forumId: string,
    userId?: string
  ): Promise<
    Forum & {
      user_has_liked: boolean;
      replies: (ForumReply & { user_has_liked: boolean })[];
    }
  > {
    const { data: forumData, error } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT)
      .eq("id", forumId)
      .single();
    if (error) throw error;

    let userHasLikedForum = false;
    if (userId) {
      const { data: likeData } = await supabase
        .from("forum_likes")
        .select("id")
        .eq("forum_id", forumId)
        .eq("user_id", userId)
        .maybeSingle();
      userHasLikedForum = !!likeData;
    }

    const { data: replies } = await supabase
      .from("forum_replies")
      .select(
        `
      id,
      forum_id,
      content,
      created_at,
      user_id,
      likes_count,
      author:users (
        username,
        avatar_url
      )
    `
      )
      .eq("forum_id", forumId)
      .order("created_at", { ascending: true });
    if (!replies) throw new Error("Gagal ambil replies");

    const repliesWithUserLike = await Promise.all(
      replies.map(async (r) => {
        let userHasLikedReply = false;
        if (userId) {
          const { data: replyLike } = await supabase
            .from("forum_reply_likes")
            .select("id")
            .eq("reply_id", r.id)
            .eq("user_id", userId)
            .maybeSingle();
          userHasLikedReply = !!replyLike;
        }
        return { ...r, user_has_liked: userHasLikedReply };
      })
    );

    return {
      ...forumData,
      user_has_liked: userHasLikedForum,
      replies: repliesWithUserLike,
    };
  }

  static async getUserStats(userId: string) {
    const { count: totalReplies } = await supabase
      .from("forum_replies")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: totalSolutions } = await supabase
      .from("forum_replies")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_solution", true);

    const { count: openQuestions } = await supabase
      .from("forums")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .neq("status", "solved");

    const { data: userData } = await supabase
      .from("users")
      .select("xp")
      .eq("id", userId)
      .single();

    return {
      reputation: userData?.xp ?? 0,
      totalReplies: totalReplies ?? 0,
      totalSolutions: totalSolutions ?? 0,
      openQuestions: openQuestions ?? 0,
    };
  }
}
