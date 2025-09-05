function safeParseFloat(number) {
  number = parseFloat(number);
  if (isNaN(number)) {
    number = 0.0;
  }
  return number;
}

const currencyFormatter = (number, precision = 2, prefix = "฿") => {
  if (number === null || number === undefined) {
    return "";
  }

  number = safeParseFloat(number);
  precision = parseInt(precision);

  return `${prefix}${number.toLocaleString("th", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })}`;
};

export default currencyFormatter;
