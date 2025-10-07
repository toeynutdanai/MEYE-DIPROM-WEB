import api from "lib/api";

export const getProductDwl = async (params = {}) => {
  return await api.post("/dropdown/product?status=active");
};

export const getOverviewObj = async (params = {}) => {
    let  obj = {
    "status": 200,
    "message": "success",
    "data": {
        "oee":"72.84%",
        "availability":"87.5%",
        "performance":"90.48%",
        "quality":"92.11%"
    },
}
  
  return obj;
//   return await api.post("/dropdown/machine", params);
};

export const getWarehouseAndOrderList = async (params = {}) => {
  return await api.post("/dataTable/warehouseTracking", params);
};

export const downloadWarehouseTracking = async (params = {}) => {
  return await api.post("/export/csv/warehouseTracking", params, {
    responseType: "blob",
  });
};