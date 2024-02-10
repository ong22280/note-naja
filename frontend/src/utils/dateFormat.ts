export const formattedDate = (rawDate: Date | undefined) => {
  if (rawDate == null || rawDate === undefined) {
    return "Date not available";
  }
  const result = new Date(rawDate).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return result;
};
