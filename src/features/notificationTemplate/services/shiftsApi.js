import api from "lib/api";

export const getAttendanceShifts = async (params = {}) => {
  return await api.post("/v1/attendance/shifts/getAttendanceShifts", params);
};

export const getAttendanceShiftsById = async (params = {}) => {
  return await api.post(
    "/v1/attendance/shifts/getAttendanceShiftsById",
    params
  );
};

export const createAttendanceShifts = async (params = {}) => {
  return await api.post("/v1/attendance/shifts/createAttendanceShifts", params);
};

export const updateAttendanceShifts = async (params = {}) => {
  return await api.post("/v1/attendance/shifts/updateAttendanceShifts", params);
};

export const manageStatusAttendanceShifts = async (params = {}) => {
  return await api.post(
    "/v1/attendance/shifts/manageStatusAttendanceShifts",
    params
  );
};
