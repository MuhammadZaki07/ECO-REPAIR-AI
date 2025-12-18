import { supabase } from "@/lib/supabase/client";
import type { Forum, ForumReply, ForumLike } from "@/types/forum";

export class ForumService {
  static async getForums(): Promise<Forum[]> {
    const { data, error } = await supabase
      .from("forums")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[ForumService.getForums]", error.message);
      throw new Error("Gagal mengambil daftar forum.");
    }

    return data ?? [];
  }

  static async getForumById(forumId: string): Promise<Forum> {
    const { data, error } = await supabase
      .from("forums")
      .select("*")
      .eq("id", forumId)
      .single();

    if (error) {
      console.error("[ForumService.getForumById]", error.message);
      throw new Error("Gagal mengambil detail forum.");
    }

    return data as Forum;
  }

  static async getReplies(forumId: string): Promise<ForumReply[]> {
    const { data, error } = await supabase
      .from("forum_replies")
      .select("*")
      .eq("forum_id", forumId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[ForumService.getReplies]", error.message);
      throw new Error("Gagal mengambil balasan forum.");
    }

    return data ?? [];
  }

  static async postReply(
    forumId: string,
    userId: string,
    content: string
  ): Promise<ForumReply> {
    const { data, error } = await supabase
      .from("forum_replies")
      .insert({
        forum_id: forumId,
        user_id: userId,
        content,
      })
      .select()
      .single();

    if (error) {
      console.error("[ForumService.postReply]", error.message);
      throw new Error("Gagal mengirim balasan.");
    }

    return data as ForumReply;
  }

  static async likeForum(forumId: string, userId: string): Promise<ForumLike> {
    const { data, error } = await supabase
      .from("forum_likes")
      .insert({
        forum_id: forumId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error("[ForumService.likeForum]", error.message);
      throw new Error("Gagal menyukai forum.");
    }

    return data as ForumLike;
  }

  static async likeReply(replyId: string, userId: string): Promise<ForumLike> {
    const { data, error } = await supabase
      .from("forum_reply_likes")
      .insert({
        reply_id: replyId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error("[ForumService.likeReply]", error.message);
      throw new Error("Gagal menyukai balasan.");
    }

    return data as ForumLike;
  }
}
