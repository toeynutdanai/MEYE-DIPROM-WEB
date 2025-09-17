import api from "lib/api";

export const getCompareProduct = async (params = {}) => {
  return await api.post("/log/system", params);
};

export const getActualVsPlan = async (params = {}) => {
  return await api.post("/log/system", params);
};

export const getWasteProductCompare = async (params = {}) => {
  return await api.post("/log/system", params);
};

export const getProductDwl = async (params = {}) => {
  return await api.post("/dropdown/product", params);
};

