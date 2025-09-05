import React from "react";

import ResetPasswordComponent from "../components/ResetPassword";
import useReset from "../hooks/useResetPassword";

function ResetPassword() {
  const ResetPasswordProps = useReset();
  return <ResetPasswordComponent {...ResetPasswordProps} />;
}

export default ResetPassword;
