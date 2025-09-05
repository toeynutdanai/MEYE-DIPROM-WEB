import api from "lib/api";

export const getState = async (params = {}) => {
  return await api.post("/v1/state/getState", params);
};

export const getUserListByStatusFlag = async (params = {}) => {
  return await api.post("/v1/user/a/getUserListByStatusFlag", params);
};

export const getUserListByLevel = async (params = {}) => {
  return await api.post("/v1/user/a/getUserListByLevel", params);
};

export const updateUserCheckState = async (params = {}) => {
  return await api.post("/v1/user/a/updateUserCheckState", params);
}