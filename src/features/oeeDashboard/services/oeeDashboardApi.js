import api from "lib/api";

export const getMachineDwl = async (params = {}) => {
  return await api.post("/dropdown/machine", params);
};
  
export const getOEEList = async (params = {}) => {
  return await api.post("/dataTable/oeeMachine", params);
};

// oeePercent
export const getOEEObj = async (params = {}) => {
  return await api.post("/chart/oeePercent", params);
};

// oeeFactor
export const getFactorObj = async (params = {}) => {
  return await api.post("/chart/oeeFactor", params);
};

// oeeMachine
export const getOEEByMachineList = async (params = {}) => {
  return await api.post("/chart/oeeMachine", params);
};

// drillDownMachine
export const getOEEMachineObj = async (params = {}) => {
  return await api.post("/chart/drillDownMachine", params);
};

export const downloadOEEMachine = async (params = {}) => {
  return await api.post("/export/csv/oeeMachine", params, {
    responseType: "blob",
  });
};