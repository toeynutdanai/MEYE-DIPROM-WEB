import { t } from "i18next";
import formatUnit from "./formatUnit";

function formatSeconds(
  value,
  units = { singular: t("unit.second"), plural: t("unit.seconds") }
) {
  if (!value) return;
  return formatUnit(value, units);
}

export default formatSeconds;
