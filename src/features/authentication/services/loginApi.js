import api from "lib/api";

export const login = async (params = {}) => {
  return await api.post(`/v1/system/signIn`, params);
};
