import React from "react";

import LoginComponent from "../components/Login";
import useLogin from "../hooks/useLogin";

function Login() {
  const loginProps = useLogin();
  return <LoginComponent {...loginProps} />;
}

export default Login;
