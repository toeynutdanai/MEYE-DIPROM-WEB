import api from "lib/api";

export const getUserManagementList = async (params = {}) => {
  return await api.post("/dataTable/userManagement", params);
};

export const getRoles = async (params = {}) => {
  return await api.post("/dropdown/roles", params);
};

export const userManagement = async (params = {}) => {
  return await api.post("/userManagement", params);
};