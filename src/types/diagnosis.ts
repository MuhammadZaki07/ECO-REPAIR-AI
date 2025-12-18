export interface DiagnosisHookResult {
  data: DiagnosisRecord | null;
  isLoading: boolean;
  error: string | null;
}

export interface HistoryHookResult {
  data: HistorySummary[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface CreateDiagnosisHookResult {
  isSubmitting: boolean;
  error: string | null;
  create: (
    userId: string,
    description: string,
    aiResponse: any
  ) => Promise<number | undefined>;
}

export interface DiagnosisItem {
  title: string;
  description: string;
  resource_id?: string;
}

export interface DiagnosisSection {
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
