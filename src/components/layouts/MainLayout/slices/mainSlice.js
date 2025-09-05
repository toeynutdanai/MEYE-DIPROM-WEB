import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "user",
  initialState: {
    collapsed: false,
  },
  reducers: {
    setCollapsed(state, action) {
      state.collapsed = action.payload;
    },
  },
});

export const { setCollapsed } = mainSlice.actions;
export default mainSlice.reducer;
