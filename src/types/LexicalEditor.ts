export type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
  detail?: number;
  format?: number;
  style?: string;
  url?: string;
};
