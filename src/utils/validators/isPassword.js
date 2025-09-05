export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$()\-_+=!%*?&])[A-Za-z\d@#$()\-_+=!%*?&]{8,}$/;

const isPassword = (value) => PASSWORD_REGEX.test(value);

export default isPassword;
