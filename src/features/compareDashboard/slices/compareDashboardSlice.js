import { createSlice } from "@reduxjs/toolkit";

const compareDashboardSlice = createSlice({
  name: "compareDashboard",
  initialState: {
    isLoading: false,
    compareProductList: [],
    actualVsPlanObj:{},
    wasteProductCompareObj:{},
    productDwl:[],
    overviewObj:{},
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
    setCompareProductList(state, action) {
      state.compareProductList = Array.isArray(action.payload) ? action.payload : [];
    },
    setActualVsPlanObj(state,action){
        state.actualVsPlanObj = action.payload;
    },
    setWasteProductCompareObj(state,action){
        state.wasteProductCompareObj = action.payload;
    },
    setProductDwl(state,action){
        state.productDwl = Array.isArray(action.payload) ? action.payload : [];
    },
    setOverviewObj(state,action){
        state.overviewObj = action.payload;
    },
  },
});

export const { setIsLoading, setCompareProductList, setActualVsPlanObj,setWasteProductCompareObj,setProductDwl,setOverviewObj, setFilter } = compareDashboardSlice.actions;
export default compareDashboardSlice.reducer;