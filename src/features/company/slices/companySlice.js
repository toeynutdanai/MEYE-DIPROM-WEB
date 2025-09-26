import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    isLoading: false,
    companyObj: {},
    pagination: { page: 1, pageSize: 25, total: 0 },
    filter: {},
    error: null,
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    setCompanyObj(state,action){
        state.companyObj = action.payload;
    },
  },
});

export const { setIsLoading, setCompanyObj, setFilter } = companySlice.actions;
export default companySlice.reducer;