export interface AIStepItem {
  title: string;
  description: string;
}

export interface AIStepSection {
  tag: "RISK!" | "TOOLS" | "STEPS" | "PARTS";
  label: string;
  items: AIStepItem[];
}

export interface AIResponse {
  title: string;
  summary: string;
  sections: AIStepSection[];
}

export interface ChatMessageProps {
  id: number;
  type: "user" | "ai";
  text?: string;
  image?: string | null;
  data?: AIResponse;
  meta: boolean;
  diagnosisId: string | number;
}

export interface ChatContainerProps {
  messages: ChatMessageProps[];
  loading: boolean;
}

export interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  loading: boolean;
  files: File[];
  setFiles: (val: File[]) => void;
  hasMessages: boolean;
}
