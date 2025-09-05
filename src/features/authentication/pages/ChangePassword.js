import ChangePasswordComponent from "../components/ChangePassword";
import useChangePassword from "../hooks/useChangePassword";

function ChangePassword() {
  const changePasswordProps = useChangePassword();
  return <ChangePasswordComponent {...changePasswordProps} />;
}

export default ChangePassword;
