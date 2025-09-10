import api from "lib/api";

export const getSystemLog = async (params = {}) => {
  return await api.post("/test/users", params);
};

