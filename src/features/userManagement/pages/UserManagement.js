import useUserManagement from "../hooks/useUserManagement";
import UserManagementComponent from "../components/UserManagement";

function UserManagement() {
  const userManagementProps = useUserManagement();
  return <UserManagementComponent {...userManagementProps} />;
}

export default UserManagement;
