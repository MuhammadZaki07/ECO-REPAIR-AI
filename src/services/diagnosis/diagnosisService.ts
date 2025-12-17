import { supabase } from "@/lib/supabase/client";

interface DiagnosisItem {
  title: string;
  description: string;
  resource_id?: string;
}

interface DiagnosisSection {
  tag: "RISK!" | "STEPS" | "PARTS" | "TOOLS" | "SUMMARY";
  items: DiagnosisItem[];
}

export interface DiagnosisRecord {
  id: number;
  user_id: string;
  created_at: string;
  user_description: string;
  ai_response_json: {
    title: string;
    summary: string;
    sections: DiagnosisSection[];
  };
}

export interface HistorySummary {
  id: number;
  title: string;
  date: string;
  summary: string;
  user_input: string;
}

export async function fetchDiagnosisById(
  id: string | number
): Promise<DiagnosisRecord | null> {
  const { data, error } = await supabase
    .from("diagnoses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[fetchDiagnosisById]", error.message);
    throw new Error("Gagal mengambil detail diagnosis.");
  }

  return data as DiagnosisRecord;
}

export async function fetchDiagnosisSummaries(): Promise<HistorySummary[]> {
  const { data, error } = await supabase
    .from("diagnoses")
    .select("id, created_at, user_description, ai_response_json")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fetchDiagnosisSummaries]", error.message);
    throw new Error("Gagal mengambil riwayat diagnosis.");
  }

  return data.map((record: any) => ({
    id: record.id,
    date: record.created_at,
    user_input: record.user_description,
    title: record.ai_response_json?.title ?? "Judul Tidak Tersedia",
    summary: record.ai_response_json?.summary ?? "Ringkasan Tidak Tersedia",
  }));
}

/**
 * Membuat record diagnosis baru di Supabase.
 * Dalam implementasi nyata, ini akan memicu pemrosesan AI di backend.
 * Kami menyertakan respons AI mock sederhana untuk tujuan integrasi frontend.
 * * @param user_id ID pengguna yang saat ini login.
 * @param user_description Deskripsi masalah dari input pengguna.
 * @returns ID record yang baru dibuat.
 */
export async function createDiagnosis(
  user_id: string,
  user_description: string,
  ai_response_json: {
    title: string;
    summary: string;
    sections: any[];
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
    console.error("[createDiagnosis]", error.message);
    throw new Error("Gagal menyimpan diagnosis baru.");
  }

  return data.id;
}


export async function deleteDiagnosis(id: number): Promise<void> {
  const { error } = await supabase
    .from("diagnoses")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Gagal menghapus diagnosis.");
  }
}

