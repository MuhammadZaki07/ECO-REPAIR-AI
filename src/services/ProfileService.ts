import { supabase } from "@/lib/supabase/client";

export class ProfileService {
  static async updateProfile(
    authId: string,
    payload: {
      bio?: string;
      location?: string;
    }
  ) {
    const { error } = await supabase
      .from("users")
      .upsert(
        {
          auth_id: authId,
          ...payload,
        },
        { onConflict: "auth_id" }
      );

    if (error) throw error;
  }

  static async exportUserData(userId: string) {
    const tables = [
      { name: "forums", fk: "user_id" },
      { name: "forum_likes", fk: "user_id" },
      { name: "forum_replies", fk: "user_id" },
      { name: "forum_reply_likes", fk: "user_id" },
      { name: "diagnoses", fk: "user_id" },
      { name: "user_rewards", fk: "user_id" },
    ];

    const exportData: Record<string, any> = {};

    for (const t of tables) {
      const { data, error } = await supabase
        .from(t.name)
        .select("*")
        .eq(t.fk, userId);

      if (error) throw error;
      exportData[t.name] = data ?? [];
    }

    return exportData;
  }

  static async deleteAccount() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}
