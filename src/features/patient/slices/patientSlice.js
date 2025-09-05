import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    isLoading: false,
    isLogin: false,
    patientList: [],
    patient: {},
    bloodPressureList: [],
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setPatientList(state, action) {
      state.patientList = action.payload;
    },
    setPatient(state, action) {
      state.patient = action.payload;
    },
    setBloodPressureList(state, action) {
      state.bloodPressureList = action.payload;
    },
  },
});

export const { setIsLoading, setPatientList, setPatient, setBloodPressureList } =
  patientSlice.actions;
export default patientSlice.reducer;
