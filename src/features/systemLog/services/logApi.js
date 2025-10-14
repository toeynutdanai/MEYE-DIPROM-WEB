import api from "lib/api";

export const getAccessLog = async (params = {}) => {
  return await api.post("/dataTable/logActivity", params);
};

export const getInterfaceLog = async (params = {}) => {
  return await api.post("/dataTable/logInterface", params);
};

export const downloadLogInterfaceFail = async (params = {}) => {
  return await api.post("/export/csv/interfaceFile", params);
};


