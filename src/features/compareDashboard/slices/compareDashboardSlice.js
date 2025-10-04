import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  compareProductList: [],
  productList: [],
  actualVsPlanObj: {},
  wasteProductCompareObj: {},
  overviewObj: {},
  pagination: { page: 1, pageSize: 25, total: 0 },
  filter: {},
};

const compareDashboardSlice = createSlice({
  name: "compareDashboard",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = Boolean(action.payload);
    },

    setFilter(state, action) {
      state.filter = { ...state.filter, ...(action.payload ?? {}) };
    },

    setCompareProductList(state, action) {
      const list = Array.isArray(action.payload) ? action.payload : [];
      state.compareProductList = list;
    },

    setProductList(state, action) {
      const list = Array.isArray(action.payload) ? action.payload : [];
      state.productList = list;
    },

    setActualVsPlanObj(state, action) {
      state.actualVsPlanObj = action.payload ?? {};
    },

    setWasteProductCompareObj(state, action) {
      state.wasteProductCompareObj = action.payload ?? {};
    },

    setOverviewObj(state, action) {
      state.overviewObj = action.payload ?? {};
    },

    setPagination(state, action) {
      const { page, pageSize, total } = action.payload ?? {};
      if (page !== undefined) state.pagination.page = page;
      if (pageSize !== undefined) state.pagination.pageSize = pageSize;
      if (total !== undefined) state.pagination.total = total;
    },

    resetCompareDashboard() {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  setFilter,
  setCompareProductList,
  setProductList,
  setActualVsPlanObj,
  setWasteProductCompareObj,
  setOverviewObj,
  setPagination,
  resetCompareDashboard,
} = compareDashboardSlice.actions;

export default compareDashboardSlice.reducer;
