import { createSlice } from "@reduxjs/toolkit";

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    isLoading: false,
    isLogin: false,
    userManagementList: [],
    admin: {},
    roles: [],
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
    setRoles(state, action){
      state.roles = action.payload;
    },
  },
});

export const { setIsLoading, setUserManagementList, setAdmin, setRoles } = userManagementSlice.actions;
export default userManagementSlice.reducer;
