export const formatDateID = (date?: string | Date) => {
  if (!date) return "-";

  let d: Date;
  if (typeof date === "string") {
    const normalized = date.replace(/\.\d{3,}/, "");
    d = new Date(normalized);
  } else {
    d = date;
  }

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
