import { createBrowserRouter } from "react-router-dom";

import MenuHome from "features/menu/pages/Menu";

import ChangePassword from "features/authentication/pages/ChangePassword";
import Login from "features/authentication/pages/Login";
import PrivateRoute from "PrivateRoute";

import Company from "features/company/pages/Company";
import CompareDashboard from "features/compareDashboard/pages/CompareDashboard";
import NotFound from "features/notfound/pages/NotFound";
import OEEDashboard from "features/oeeDashboard/pages/OEEDashboard";
import Role from "features/role/pages/Role";
import SystemLog from "features/systemLog/pages/SystemLog";
import UserManagement from "features/userManagement/pages/UserManagement";
import UserManagementCreate from "features/userManagement/pages/UserManagementCreate";
import UserManagementEdit from "features/userManagement/pages/UserManagementEdit";
import WarehouseTracking from "features/warehouseTracking/pages/WarehouseTracking";
import ForgotPassword from "features/authentication/pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/sign_in",
    element: <Login />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/change_password",
    element: <ChangePassword />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<MenuHome />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/compare_dashboard",
    element: <PrivateRoute element={<CompareDashboard />} />,
  },
  {
    path: "/oee_dashboard",
    element: <PrivateRoute element={<OEEDashboard />} />,
  },
  {
    path: "/warehouse_and_order",
    element: <PrivateRoute element={<WarehouseTracking />} />,
  },
  {
    path: "/authorize/company_detail",
    element: <PrivateRoute element={<Company />} />,
  },
  {
    path: "/authorize/role_detail",
    element: <PrivateRoute element={<Role />} />,
  },
  {
    path: "/authorize/user_management",
    element: <PrivateRoute element={<UserManagement />} />,
  },
  {
    path: "/authorize/create_user_management",
    element: <PrivateRoute element={<UserManagementCreate />} />,
  },
  {
    path: "/authorize/user_management/:id/edit",
    element: <PrivateRoute element={<UserManagementEdit />} />,
  },
  {
    path: "/system_log",
    element: <PrivateRoute element={<SystemLog />} />,
  },
]);

export default router;
