export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const sortDays = function (a, b) {
  a = DAYS.indexOf(a.nameEn);
  b = DAYS.indexOf(b.nameEn);
  return a - b;
};

export default sortDays;
