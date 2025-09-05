import api from "lib/api";

export const getAdminList = async (params = {}) => {
  return await api.post("/v1/user/a/getAdminPaging", params);
};

export const deleteAdmin = async (params = {}) => {
  return await api.post("/v1/user/a/deleteUserById", params);
};

export const getAdminById = async (params = {}) => {
  return await api.post("/v1/user/a/getUserById", params);
};

export const updateAdminById = async (params = {}) => {
  return await api.post("/v1/user/a/updateUserById", params);
};

export const createAdmin = async (params = {}) => {
  return await api.post("/v1/user/a/createUser", params);
};
