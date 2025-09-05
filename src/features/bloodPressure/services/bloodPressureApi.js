import api from "lib/api";

export const getBloodPressureList = async (params = {}) => {
  return await api.post("/v1/bp/a/getBloodPressurePaging", params);
};

export const getBloodPressure = async (params = {}) => {
  return await api.post("/v1/bp/a/getBloodPressureById", params);
};

export const getUserDropDown = async (params = {}) => {
  return await api.post("/v1/dropdown/getUserList", params);
};

export const deleteBloodPressure = async (params = {}) => {
  return await api.post("/v1/bp/a/deleteBloodPressureById", params);
}

export const createBloodPressure = async (params = {}) => {
  return await api.post("/v1/bp/createBloodPressure", params);
}

export const updateBloodPressureById = async (params = {}) => {
  return await api.post("/v1/bp/a/updateBloodPressureById", params);
}

export const exportExcel = async (params = {}) => {
  return await api.post("/v1/bp/export/excel", params, {
    responseType: "blob",
  });
};