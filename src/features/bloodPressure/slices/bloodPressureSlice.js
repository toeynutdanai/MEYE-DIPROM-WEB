import { createSlice } from "@reduxjs/toolkit";

const bloodPressureSlice = createSlice({
  name: "bloodPressure",
  initialState: {
    isLoading: false,
    bloodPressureList: [],
    userDropDownName: [],
    userDropDownHn: [],
    userDropDownNameHn: [],
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setBloodPressureList(state, action) {
      state.bloodPressureList = action.payload;
    },
    setUserDropDownName(state, action) {
      state.userDropDownName = action.payload;
    },
    setUserDropDownHn(state, action) {
      state.userDropDownHn = action.payload;
    },
    setUserDropDownNameHn(state, action) {
      state.userDropDownNameHn = action.payload;
    }
  },
});

export const { setIsLoading, setBloodPressureList, setUserDropDownName, setUserDropDownHn, setUserDropDownNameHn } =
  bloodPressureSlice.actions;
export default bloodPressureSlice.reducer;
