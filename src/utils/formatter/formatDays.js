import { t } from "i18next";
import formatUnit from "./formatUnit";

function formatDays(
  value,
  units = { singular: t("unit.day"), plural: t("unit.days") }
) {
  if (!value) return;
  return formatUnit(value, units);
}

export default formatDays;
