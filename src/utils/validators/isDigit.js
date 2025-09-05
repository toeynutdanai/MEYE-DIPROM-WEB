export const DIGIT_REGEX = /^[0-9]*$/;

const isDigit = (value) => DIGIT_REGEX.test(value);

export default isDigit;
