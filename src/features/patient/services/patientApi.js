import api from "lib/api";

export const getPatientList = async (params = {}) => {
  return await api.post("/v1/user/a/getUserPaging", params);
};

export const getPatientById = async (params = {}) => {
  return await api.post("/v1/user/a/getUserById", params);
}

export const deletePatient = async (params = {}) => {
  return await api.post("/v1/user/a/deleteUserById", params);
};

export const updateUserCheckState = async (params = {}) => {
  return await api.post("/v1/user/a/updateUserCheckState", params);
}

export const updateUserById = async (params = {}) => {
  return await api.post("/v1/user/a/updateUserById", params);
}

export const getBloodPressureByCreateBy = async (params = {}) => {
  return await api.post("/v1/bp/a/getBloodPressureByCreateBy", params);
}