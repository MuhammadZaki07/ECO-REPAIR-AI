import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  ParagraphNode,
  TextNode,
  type Klass,
  type LexicalNode,
  type LexicalNodeReplacement,
} from "lexical";

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [HeadingNode, ParagraphNode, TextNode, QuoteNode, ListNode, ListItemNode];
