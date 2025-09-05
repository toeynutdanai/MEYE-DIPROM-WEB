export const PHONE_NUMBER_REGEX = /0[0-9]{2}[0-9]{3}[0-9]{4}/i;

const isPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return;
  return PHONE_NUMBER_REGEX.test(phoneNumber);
};

export default isPhoneNumber;
