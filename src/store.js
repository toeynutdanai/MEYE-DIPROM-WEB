import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "components/layouts/MainLayout/slices/mainSlice";
import loginReducer from "features/authentication/slices/loginSlice";
import passwordReducer from "features/authentication/slices/passwordSlice";
import signUpReducer from "features/authentication/slices/signUpSlice";
import bloodPressureSlice from "features/bloodPressure/slices/bloodPressureSlice";
import homeSlice from "features/home/slices/homeSlice";
import patientSlice from "features/patient/slices/patientSlice";
import adminSlice from "features/userManagement/slices/adminSlice";
import logSlice from "features/systemLog/slices/logSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    login: loginReducer,
    signUp: signUpReducer,
    password: passwordReducer,
    main: mainReducer,
    patient: patientSlice,
    admin: adminSlice,
    bloodPressure: bloodPressureSlice,
    log: logSlice
  },
});
