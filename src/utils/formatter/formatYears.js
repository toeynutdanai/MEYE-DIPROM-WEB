import { t } from "i18next";
import formatUnit from "./formatUnit";

function formatYears(
  value,
  units = { singular: t("unit.year"), plural: t("unit.years") }
) {
  if (!value) return;
  return formatUnit(value, units);
}

export default formatYears;
