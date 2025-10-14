import api from "lib/api";

export const getUserManagementList = async (params = {}) => {
  return await api.post("/dataTable/userManagement", params);
};

export const deleteAdmin = async (params = {}) => {
  return await api.post("/v1/user/a/deleteUserById", params);
};