import { createBrowserRouter } from "react-router-dom";

import MenuHome from "features/menu/pages/Menu";

import ChangePassword from "features/authentication/pages/ChangePassword";
import ForgotPassword from "features/authentication/pages/ForgotPassword";
import Login from "features/authentication/pages/Login";
import ResetPassword from "features/authentication/pages/ResetPassword";
//import SignUp from "features/authentication/pages/SignUp";
import BloodPressureEdit from "features/bloodPressure/pages/BloodPressureEdit";
import BloodPressureList from "features/bloodPressure/pages/BloodPressureList";
import PatientList from "features/patient/pages/PatientList";
import Patient from "features/patient/pages/Patient";
import PatientEdit from "features/patient/pages/PatientEdit";
import PrivateRoute from "PrivateRoute";

import NotFound from "features/notfound/pages/NotFound";
import UserManagement from "features/userManagement/pages/UserManagement";
import UserManagementEdit from "features/userManagement/pages/UserManagementEdit";
import UserManagementCreate from "features/userManagement/pages/UserManagementCreate";
import SystemLog from "features/systemLog/pages/SystemLog";
import CompareDashboard from "features/compareDashboard/pages/CompareDashboard";
// import { Menu } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<MenuHome />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/sign_in",
    element: <Login />,
  },
  // {
  //   path: "/sign_up",
  //   element: <SignUp />,
  // },
  {
    path: "/forgot_password",
    element: <ForgotPassword />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/change_password",
    element: <ChangePassword />,
  },
  {
    path: "/patient",
    element: <PrivateRoute element={<PatientList />} />,
  },
  {
    path: "/patient/:id",
    element: <PrivateRoute element={<Patient />} />,
  },
  {
    path: "/patient/:id/edit",
    element: <PrivateRoute element={<PatientEdit />} />,
  },
  {
    path: "/blood_pressure",
    element: <PrivateRoute element={<BloodPressureList />} />,
  },
  {
    path: "/blood_pressure/:id/edit",
    element: <PrivateRoute element={<BloodPressureEdit />} />,
  },
  {
    path: "/user_management",
    element: <PrivateRoute element={<UserManagement />} />,
  },
  {
    path: "/create_user_management",
    element: <PrivateRoute element={<UserManagementCreate />} />,
  },
  {
    path: "/user_management/:id/edit",
    element: <PrivateRoute element={<UserManagementEdit />} />,
  },
  {
    path: "/system_log",
    element: <PrivateRoute element={<SystemLog />} />,
  },
  {
    path: "/compare_dashboard",
    element: <PrivateRoute element={<CompareDashboard />} />,
  },
]);

export default router;
