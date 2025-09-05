import { t } from "i18next";
import formatUnit from "./formatUnit";

function formatMinutes(
  value,
  units = { singular: t("unit.minute"), plural: t("unit.minutes") }
) {
  if (!value) return;
  return formatUnit(value, units);
}

export default formatMinutes;
