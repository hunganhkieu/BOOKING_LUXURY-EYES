export const getDayLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  const weekday = date.getDay();
  const labels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  return labels[weekday];
};
