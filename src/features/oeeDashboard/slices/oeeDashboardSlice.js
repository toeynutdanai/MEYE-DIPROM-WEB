import { createSlice } from "@reduxjs/toolkit";

const oeeDashboardSlice = createSlice({
  name: "oeeDashboard",
  initialState: {
    isLoading: false,
    oeeList: [],
    oeeObj:{},
    oeeMachineObj:{},
    factorObj:{},
    machineDwl:[],
    overviewObj:{},
    oeeByMachineList:[],
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
    setOEEList(state, action) {
      state.oeeList = Array.isArray(action.payload) ? action.payload : [];
    },
    setOEEObj(state,action){
        state.oeeObj = action.payload;
    },
    setOEEMachineObj(state,action){
        state.oeeMachineObj = action.payload;
    },
    setFactorObj(state,action){
        state.factorObj = action.payload;
    },
    setMachineDwl(state,action){
        state.machineDwl = Array.isArray(action.payload) ? action.payload : [];
    },
    setOverviewObj(state,action){
        state.overviewObj = action.payload;
    },
    setOEEByMachineList(state,action){
        state.oeeByMachineList = Array.isArray(action.payload) ? action.payload : [];
    }
  },
});

export const { setIsLoading, setOEEList, setOEEObj,setOEEMachineObj,setFactorObj,setMachineDwl,setOverviewObj,setOEEByMachineList, setFilter } = oeeDashboardSlice.actions;
export default oeeDashboardSlice.reducer;