export const getInitial = (str?: string, fallback = "U"): string => {
  return str?.charAt(0)?.toUpperCase() ?? fallback;
};
