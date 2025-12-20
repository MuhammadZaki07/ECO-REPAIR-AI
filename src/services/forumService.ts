import { supabase } from "@/lib/supabase/client";
import type { Forum, ForumReply } from "@/types/forum";
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
  category:categories!inner (
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
  static async getForums(): Promise<Forum[]> {
    const { data, error } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  static async getForumsByUser(userId: string): Promise<Forum[]> {
    const { data, error } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
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

  static async getTrendingForums(): Promise<Forum[]> {
    const { data, error } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT)
      .order("likes_count", { ascending: false })
      .limit(10);
    if (error) throw error;
    return data ?? [];
  }

  static async getSolvedForums(): Promise<Forum[]> {
    const { data, error } = await supabase
      .from("forums")
      .select(BASE_FORUM_SELECT)
      .eq("status", "solved")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
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
}
