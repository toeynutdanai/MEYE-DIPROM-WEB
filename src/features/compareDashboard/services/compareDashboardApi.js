import api from "lib/api";

export const getCompareDashboardList = async (params = {}) => {

  let obj = {
    "status": 200,
    "message": "success",
    "data": []
    }
  return obj;
};

export const getCompareProduct = async (params = {}) => {
  let  obj = {
    "status": 200,
    "message": "success",
    "data": [
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
        {"productionDate":params.param.scope,"perProduction":params.param.product,"perTimeUtilization":params.param.duration,"actualProduction":"14","actualMachineRunningTime":"15"},
      ]
    }
  
  return obj;
  // return await api.post("/log/system", params);
};


export const getActualVsPlan = async (params = {}) => {
  let text = params.param.scope==='Monthly' ? ["w1","w2","w3","w4","w5","w6"]:["m1","m2","m3","m4","m5","m6","m7","m8","m9","m10","m11","m12"]
  let  obj = {
    "status": 200,
    "message": "success",
    "data": {
      "label": text,
      "planQuantity":{
        "label":"Plan",
        "value":["55","0","40","80","0"]
      },
      "actualTotalQuantity":{
        "label":"Actual",
        "value":["52","75","69","90","0"],
      },
      "perQuantity":{
        "label":"Percent",
        "value":["80","60","48","99","0"]
      },
    }
  }

  return obj;
  // return await api.post("/log/system", params);
};

export const getWasteProductCompare = async (params = {}) => {
  let text = params.param.scope==='Monthly' ? ["w1","w2","w3","w4","w5","w6"]:["m1","m2","m3","m4","m5","m6","m7","m8","m9","m10","m11","m12"]
  let  obj = {
    "status": 200,
    "message": "success",
    "data": {
      "label": text,
      "actualWasteQuantity":{
        "label":"Actual",
        "value":["54","30","0","90","0"]
      },
      "perQuantity":{
        "label":"Percent",
        "value":["85","61","46","94","0"]
      },
     
    }
  }
  return obj;
  // return await api.post("/log/system", params);
};

export const getProductDwl = async (params = {}) => {
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

