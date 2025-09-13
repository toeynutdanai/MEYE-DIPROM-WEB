
const AUTH_TOKEN = "auth-token";
const USERNAME = "username";
const PERMISSION = "permiss";
const NAME = "name";
const COMPANY_CODE = "companyCode";
const COMPANY_NAME = "companyName";

const getAuthToken = () => window.localStorage.getItem(AUTH_TOKEN);
const setAuthToken = (authToken) =>
  window.localStorage.setItem(AUTH_TOKEN, authToken);
const removeAuthToken = () => {
  window.localStorage.removeItem(AUTH_TOKEN);
  window.localStorage.removeItem(USERNAME);
  window.localStorage.removeItem(PERMISSION);
  window.localStorage.removeItem(NAME);
  window.localStorage.removeItem(COMPANY_CODE);
  window.localStorage.removeItem(COMPANY_NAME);
}
const isAuthTokenPresent = () => getAuthToken() !== null;


const session = {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  isAuthTokenPresent,

};

export default session;
