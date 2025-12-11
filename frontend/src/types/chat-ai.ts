export interface RepairStep {
  label: string;
  detail: string;
  tag: "RISK!" | "TOOLS" | "STEPS" | "PARTS";
}

export interface ChatMessageProps {
  id: number;
  type: "user" | "ai";
  text: string;
  steps?: RepairStep[];
  image?: string;
}
