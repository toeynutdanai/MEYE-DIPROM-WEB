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
  let  obj = {
    "status": 200,
    "message": "success",
    "data": [
        {
            "productName":"P001",
            "unit":"%",
            "stockOnHand":"14",
            "upcomingStock":"",
            "reservedStock":"",
            "availableStock":"1000",
            "statusStock":"%",
            "queueAhead":"14",
            "estimatedTimeArrival":"",
        },
      ]
    }
  
  return obj;
  // return await api.post("/log/system", params);
};

