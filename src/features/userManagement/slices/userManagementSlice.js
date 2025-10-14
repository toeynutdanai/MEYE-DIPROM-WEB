import { createSlice } from "@reduxjs/toolkit";

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    isLoading: false,
    isLogin: false,
    userManagementList: [],
    admin: {},
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUserManagementList(state, action) {
      state.userManagementList = action.payload;
    },
    setAdmin(state, action) {
      state.admin = action.payload;
    },
  },
});

export const { setIsLoading, setUserManagementList, setAdmin } = userManagementSlice.actions;
export default userManagementSlice.reducer;
