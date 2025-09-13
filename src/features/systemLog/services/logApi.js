import api from "lib/api";

export const getSystemLog = async (params = {}) => {
  return await api.post("/log/system", params);
};

