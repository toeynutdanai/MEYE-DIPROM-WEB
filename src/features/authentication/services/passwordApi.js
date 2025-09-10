import api from "lib/api";

export const forgetPassword = async (params = {}) => {
  return await api.post(`/v1/system/forgotPassword`, params);
};

export const resetPassword = async (params = {}) => {
  return await api.post("/v1/password/reset", params);
};

export const changePassword = async (params = {}) => {
  return await api.post("/changePassword", params);
};
