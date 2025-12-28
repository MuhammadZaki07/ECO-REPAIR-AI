import { supabase } from "@/lib/supabase/client";
import type {
  DiagnosisRecord,
  FetchDiagnosisParams,
  HistorySummary,
} from "@/types/diagnosis";

export class DiagnosisService {
  static async fetchById(id: string): Promise<DiagnosisRecord | null> {
    const { data, error } = await supabase
      .from("diagnoses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data as DiagnosisRecord;
  }

  static async fetchSummaries(params: FetchDiagnosisParams): Promise<{
    data: HistorySummary[];
    total: number;
  }> {
    const {
      userId,
      page = 1,
      pageSize = 10,
      search = "",
      fromDate,
      toDate,
    } = params;

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("diagnoses")
      .select("id, created_at, user_description, ai_response_json", {
        count: "exact",
      })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.or(
        `user_description.ilike.%${search}%,ai_response_json->>title.ilike.%${search}%`
      );
    }

    if (fromDate) query = query.gte("created_at", fromDate);
    if (toDate) query = query.lte("created_at", toDate);

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    return {
      total: count ?? 0,
      data: (data ?? []).map((record) => ({
        id: record.id,
        date: record.created_at,
        user_input: record.user_description,
        title: record.ai_response_json?.title ?? "Untitled",
        summary: record.ai_response_json?.summary ?? "No summary available",
      })),
    };
  }

  static async create(
    userId: string,
    userDescription: string,
    aiResponse: {
      title: string;
      summary: string;
      sections: {
        title: string;
        label: string;
        items: { title: string; description: string }[];
      }[];
    }
  ): Promise<string> {
    const { data, error } = await supabase
      .from("diagnoses")
      .insert({
        user_id: userId,
        user_description: userDescription,
        ai_response_json: aiResponse,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase.from("diagnoses").delete().eq("id", id);

    if (error) throw new Error(error.message);
  }
}
