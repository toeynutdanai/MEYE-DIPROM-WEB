import { createSlice } from "@reduxjs/toolkit";

const compareDashboardSlice = createSlice({
  name: "compareDashboard",
  initialState: {
    isLoading: false,
    isLogin: false,
    compareProductList: [],
    actualVsPlanList:[],
    wasteProductCompareList:[],
    productDwl:[]
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCompareProductList(state, action) {
      state.compareProductList = Array.isArray(action.payload) ? action.payload : [];
    },
    setActualVsPlanList(state,action){
        state.actualVsPlanList = Array.isArray(action.payload) ? action.payload : [];
    },
    setWasteProductCompareList(state,action){
        state.wasteProductCompareList = Array.isArray(action.payload) ? action.payload : [];
    },
    setProductDwl(state,action){
        state.productDwl = Array.isArray(action.payload) ? action.payload : [];
    }
  },
});

export const { setIsLoading, setCompareProductList, setActualVsPlanList,setWasteProductCompareList,setProductDwl } = compareDashboardSlice.actions;
export default compareDashboardSlice.reducer;