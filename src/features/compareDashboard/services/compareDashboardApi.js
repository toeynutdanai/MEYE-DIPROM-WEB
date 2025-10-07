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

export const getOverviewObj = async (params = {}) => {
    let  obj = {
    "status": 200,
    "message": "success",
    "data": {
        "plannedProduction":"72.84%",
        "actualProduction":"87.5%",
        "completion":"90.48%",
        "oee":"92.11%"
    },
  }
return obj;
  // return await api.post("/log/system", params);
};

export const downloadCompareProduct = async (params = {}) => {
  return await api.post("/export/csv/compareProduct", params, {
    responseType: "blob",
  });
};