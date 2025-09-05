import dayjs from "dayjs";

function formatDayMonth(dateString, pattern = "DD-MM-YYYY") {
  if (!dateString || dateString === "0000-00-00") return;
  const date = dayjs(dateString, pattern);
  return date.format("DD MMMM");
}

export default formatDayMonth;
