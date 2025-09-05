import UserManagementEditComponent from "../components/UserManagementCreate";
import useUserManagementCreate from "../hooks/useUserManagementCreate";

const UserManagementCreate = () => {
  const userManagementCreateProps = useUserManagementCreate();
  return <UserManagementEditComponent {...userManagementCreateProps} />;
};

export default UserManagementCreate;
