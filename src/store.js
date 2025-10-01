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
import compareDashboardSlice from "features/compareDashboard/slices/compareDashboardSlice";
import oeeDashboardSlice from "features/oeeDashboard/slices/oeeDashboardSlice";
import warehouseTrackingSlice from "features/warehouseTracking/slices/warehouseTrackingSlice";
import companySlice from "features/company/slices/companySlice";
import roleSlice from "features/role/slices/roleSlice";

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
    log: logSlice,
    compareDashboard:compareDashboardSlice,
    oeeDashboard: oeeDashboardSlice,
    warehouseTracking:warehouseTrackingSlice,
    company: companySlice,
    role: roleSlice
  },
});
