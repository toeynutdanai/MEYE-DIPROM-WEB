import UserManagementEditComponent from "../components/UserManagementEdit";
import useUserManagementEdit from "../hooks/useUserManagementEdit";

const UserManagementEdit = () => {
  const userManagementEditProps = useUserManagementEdit();
  return <UserManagementEditComponent {...userManagementEditProps} />;
};

export default UserManagementEdit;
