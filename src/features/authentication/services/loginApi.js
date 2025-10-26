import api from "lib/api";

export const login = async (params = {}) => {
  return await api.post(`/auth/login`, params);
};