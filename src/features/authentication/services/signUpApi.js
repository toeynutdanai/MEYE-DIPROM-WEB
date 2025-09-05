import api from "lib/api";

export const signUp = async (params = {}) => {
  return await api.post(`/v1/system/signUp`, params);
};
