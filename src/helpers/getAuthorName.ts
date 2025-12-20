import type { Forum } from "@/types/forum";

export const getAuthorName = (author?: Forum["author"]) => {
  if (!author) return "Anonymous";

  if (author.first_name || author.last_name) {
    return `${author.first_name ?? ""} ${author.last_name ?? ""}`.trim();
  }

  return author.username ?? "Anonymous";
};
