import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isLogin: false,
    profile: {
      id:"",
      email: "",
      name: "",
    },
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setIsLoading, setIsLogin, setProfile } = loginSlice.actions;
export default loginSlice.reducer;
