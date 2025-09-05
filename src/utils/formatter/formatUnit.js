function formatUnit(value, units) {
  if (!units) {
    throw new TypeError("Missing unit dictionary argument");
  }

  if (!units.singular || !units.plural) {
    throw new TypeError("Missing singular and plural unit keys");
  }

  if (typeof value !== "number") {
    throw new TypeError("Value must be a number");
  }

  return `${Math.abs(value)} ${
    Math.abs(value) <= 1 ? units.singular : units.plural
  }`;
}

export default formatUnit;
