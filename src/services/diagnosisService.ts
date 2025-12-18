import { supabase } from "@/lib/supabase/client";
import type { DiagnosisRecord, HistorySummary } from "@/types/diagnosis";

export class DiagnosisService {
  static async fetchById(id: string | number): Promise<DiagnosisRecord | null> {
    const { data, error } = await supabase
      .from("diagnoses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[DiagnosisService.fetchById]", error.message);
      throw new Error("Gagal mengambil detail diagnosis.");
    }

    return data as DiagnosisRecord;
  }

  static async fetchSummaries(): Promise<HistorySummary[]> {
    const { data, error } = await supabase
      .from("diagnoses")
      .select("id, created_at, user_description, ai_response_json")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[DiagnosisService.fetchSummaries]", error.message);
      throw new Error("Gagal mengambil riwayat diagnosis.");
    }

    return (data ?? []).map((record) => ({
      id: record.id,
      date: record.created_at,
      user_input: record.user_description,
      title: record.ai_response_json?.title ?? "Judul Tidak Tersedia",
      summary: record.ai_response_json?.summary ?? "Ringkasan Tidak Tersedia",
    }));
  }

  static async create(
    user_id: string,
    user_description: string,
    ai_response_json: {
      title: string;
      summary: string;
      sections: [];
    }
  ): Promise<number> {
    const { data, error } = await supabase
      .from("diagnoses")
      .insert({
        user_id,
        user_description,
        ai_response_json,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[DiagnosisService.create]", error.message);
      throw new Error("Gagal menyimpan diagnosis baru.");
    }

    return data.id;
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase.from("diagnoses").delete().eq("id", id);

    if (error) {
      console.error("[DiagnosisService.delete]", error.message);
      throw new Error("Gagal menghapus diagnosis.");
    }
  }
}
