import { createSlice } from "@reduxjs/toolkit";

const notificationTemplateSlice = createSlice({
  name: "notificationTemplate",
  initialState: {
    isLoading: false,
    emailList: [],
    currentEmail: {},
    mobileNumberList: [],
    currentMobileNumber: {},
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setEmailList(state, action) {
      state.emailList = action.payload;
    },
    setCurrentEmail(state, action) {
      state.currentEmail = action.payload;
    },
    setMobileNumber(state, action) {
      state.mobileNumberList = action.payload;
    },
    setCurrentMonileNumber(state, action) {
      state.currentMobileNumber = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setEmailList,
  setCurrentEmail,
  setMobileNumber,
  setCurrentMonileNumber,
} = notificationTemplateSlice.actions;
export default notificationTemplateSlice.reducer;
