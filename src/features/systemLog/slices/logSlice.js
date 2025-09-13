import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "log",
  initialState: {
    isLoading: false,
    isLogin: false,
    logList: [],
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setLogList(state, action) {
      state.logList = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const { setIsLoading, setLogList } = logSlice.actions;
export default logSlice.reducer;