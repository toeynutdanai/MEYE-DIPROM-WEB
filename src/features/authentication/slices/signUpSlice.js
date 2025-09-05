import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    isLoading: false,
    isLogin: false,
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const { setIsLoading, setIsLogin } = signUpSlice.actions;
export default signUpSlice.reducer;
