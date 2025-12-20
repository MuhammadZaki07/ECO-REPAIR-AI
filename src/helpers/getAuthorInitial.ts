import type { Forum } from "@/types/forum";
import { getAuthorName } from "./getAuthorName";

export const getAuthorInitial = (author?: Forum["author"]) => {
  const name = getAuthorName(author);
  return name.charAt(0).toUpperCase();
};
