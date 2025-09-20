import api from "lib/api";

export const getMachineDwl = async (params = {}) => {
  return await api.post("/dropdown/machine", params);
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

export const getOEEList = async (params = {}) => {
  let  obj = {
    "status": 200,
    "message": "success",
    "data": [
        {"machineName":params.param.scope,"perOEE":"%","perAvailability":params.param.duration,"perPerformance":"14","perQuality":"15","averageBreakTime":"","averageDownTime":""},
        {"machineName":params.param.scope,"perOEE":"%","perAvailability":params.param.duration,"perPerformance":"14","perQuality":"15","averageBreakTime":"","averageDownTime":""},
      ]
    }
  
  return obj;
  // return await api.post("/log/system", params);
};


export const getOEEObj = async (params = {}) => {
  let text = params.param.scope==='monthly' ? ["w1","w2","w3","w4","w5","w6"]:["m1","m2","m3","m4","m5","m6","m7","m8","m9","m10","m11","m12"]
  let  obj = {
    "status": 200,
    "message": "success",
    "data": {
      "label": text,
      "oee":{
        "label":"OEE",
        "value":["55","0","40","80","0"]
      },
    }
  }
  return obj;
  // return await api.post("/log/system", params);
};

export const getOEEMachineObj = async (params = {}) => {
  let text = params.param.scope==='monthly' ? ["w1","w2","w3","w4","w5","w6"]:["m1","m2","m3","m4","m5","m6","m7","m8","m9","m10","m11","m12"]
  let obj = {
    "status": 200,
    "message": "success",
    "data": {
      "overview": {
        "oee": "72.84%",
        "availability": "87.5%",
        "performance": "90.48%",
        "quality": "92.11%"
      },
      "label": text,
      "oee": {
        "label": "Machine",
        "value": ["49", "30", "68", "70", "6"]
      },

    }
  }
  return obj;
  // return await api.post("/log/system", params);
};

export const getFactorObj = async (params = {}) => {
  let text = params.param.scope==='monthly' ? ["w1","w2","w3","w4","w5","w6"]:["m1","m2","m3","m4","m5","m6","m7","m8","m9","m10","m11","m12"]
  let  obj = {
    "status": 200,
    "message": "success",
    "data": {
        "availability":{
            "label": text,
            "factor": {
                "label": "Availability",
                "value": ["54", "30", "0", "90", "0"]
            },
        },
        "performance":{
            "label": text,
            "factor": {
                "label": "Performance",
                "value": ["80", "35", "89", "46", "0"]
            },
        },
        "quality":{
            "label": text,
            "factor": {
                "label": "Quality",
                "value": ["88", "74", "68", "99", "0"]
            },
        }
     
    }
  }
  return obj;
  // return await api.post("/log/system", params);
};


export const getOEEByMachineList = async (params = {}) => {
  let  obj = {
    "status": 200,
    "message": "success",
    "data": [
        {"machineName":"Machine A1","machineValue":"85%"},
        {"machineName":"Machine A2","machineValue":"89%"},
        {"machineName":"Machine B1","machineValue":"92%"},
        {"machineName":"Machine B2","machineValue":"95%"},
        {"machineName":"Machine C1","machineValue":"77%"},
        {"machineName":"Machine C2","machineValue":"90%"},
      ]
  }
  return obj;
  // return await api.post("/log/system", params);
};
