import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = passwordSlice.actions;
export default passwordSlice.reducer;
