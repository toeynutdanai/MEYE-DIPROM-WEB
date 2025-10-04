import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    isLoading: false,
    permissionList: [],
    roleList:[],
    mappingList:[],
    error: null,
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setPermissionList(state,action){
        state.permissionList = Array.isArray(action.payload) ? action.payload:[];
    },
    setRoleList(state,action){
        state.roleList = Array.isArray(action.payload) ? action.payload : [];
    },
    setMappingList(state,action){
        state.mappingList = Array.isArray(action.payload) ? action.payload:[];
    }
  },
});

export const { setIsLoading, setPermissionList,setRoleList,setMappingList } = roleSlice.actions;
export default roleSlice.reducer;