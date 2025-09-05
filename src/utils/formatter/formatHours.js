import { t } from "i18next";
import formatUnit from "./formatUnit";

function formatHours(
  value,
  units = { singular: t("unit.hour"), plural: t("unit.hours") }
) {
  if (!value) return;
  return formatUnit(value, units);
}

export default formatHours;
