import { t } from "i18next";
import formatHours from "./formatHours";
import formatMinutes from "./formatMinutes";
import formatSeconds from "./formatSeconds";

function formatTimes(time) {
  if (!time || time === "00:00:00") return;
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const formattedHours = formatHours(hours || 0);
  const formattedMinutes = formatMinutes(minutes || 0);
  const formattedSeconds = formatSeconds(seconds || 0);

  return [formattedHours, formattedMinutes, formattedSeconds].join(" ");
}

export default formatTimes;
