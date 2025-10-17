import api from "lib/api";

export const getCompareProduct = async (params = {}) => {
  return await api.post("/dataTable/compareProduct", params);
};

export const getActualVsPlan = async (params = {}) => {
  return await api.post("/chart/actualPlan", params);
};

export const getWasteProductCompare = async (params = {}) => {
  return await api.post("/chart/wasteProduct", params);
};

export const getProduct = async (params = {}) => {
  return await api.post("/dropdown/product", params);
};

export const downloadCompareProduct = async (params = {}) => {
  return await api.post("/export/csv/compareProduct", params, {
    responseType: "blob",
  });
};