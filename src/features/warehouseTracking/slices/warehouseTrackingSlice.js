import { createSlice } from "@reduxjs/toolkit";

const warehouseTrackingSlice = createSlice({
  name: "warehouseTracking",
  initialState: {
    isLoading: false,
    warehouseAndOrderList: [],
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
    setWarehouseAndOrderList(state, action) {
      state.warehouseAndOrderList = Array.isArray(action.payload) ? action.payload : [];
    },
    setProductDwl(state,action){
        state.productDwl = Array.isArray(action.payload) ? action.payload : [];
    },
    setOverviewObj(state,action){
        state.overviewObj = action.payload;
    },
  },
});

export const { setIsLoading, setWarehouseAndOrderList, setProductDwl,setOverviewObj, setFilter } = warehouseTrackingSlice.actions;
export default warehouseTrackingSlice.reducer;