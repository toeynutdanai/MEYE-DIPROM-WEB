import React from "react";

import ForgotPasswordComponent from "../components/ForgotPassword";
import useForgotPassword from "../hooks/useForgotPassword";

function ForgotPassword() {
  const forgotPasswordProps = useForgotPassword();
  return <ForgotPasswordComponent {...forgotPasswordProps} />;
}

export default ForgotPassword;
