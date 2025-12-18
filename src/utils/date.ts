export const formatDateID = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
