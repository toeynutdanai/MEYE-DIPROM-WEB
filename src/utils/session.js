
const AUTH_TOKEN = "auth-token";

const getAuthToken = () => window.localStorage.getItem(AUTH_TOKEN);
const setAuthToken = (authToken) =>
  window.localStorage.setItem(AUTH_TOKEN, authToken);
const removeAuthToken = () => window.localStorage.removeItem(AUTH_TOKEN);
const isAuthTokenPresent = () => getAuthToken() !== null;


const session = {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  isAuthTokenPresent,

};

export default session;
