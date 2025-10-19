import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import session from "utils/session";

import alert from "components/elements/Alert";
import { useTranslation } from "react-i18next";
import { login } from "../services/loginApi";
import { setIsLoading, setIsLogin, setProfile } from "../slices/loginSlice";
import { Modal } from "antd";

function useLogin() {
  const { t } = useTranslation();
  const isLoading = useSelector((state) => state.login.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getRememberedUser = () => window.localStorage.getItem("rememberUser") || "";

  const initialValues = {
    username: getRememberedUser(),
    password: "",
    rememberMe: getRememberedUser() ? "Y" : "N",
  };

  const handleLogin = useCallback(
    async (values) => {
      try {
        dispatch(setIsLoading(true));
        dispatch(setIsLogin(false));

        const modifiedValues = {
          username: values.username,
          password: values.password,
        };

        const response = await login(modifiedValues);
        const token = response.data.token || null;

        if (token) {
          session.setAuthToken(token);
          window.localStorage.setItem("permiss", JSON.stringify(response.data.permissions));
          window.localStorage.setItem("username", response.data.username);
          window.localStorage.setItem("name", response.data.name);
          window.localStorage.setItem("companyCode", response.data.companyCode);
          window.localStorage.setItem("companyName", response.data.companyName);

          dispatch(setProfile(response.data));
          dispatch(setIsLogin(true));

          alert({ message: t("sign_in.status.successful") });
          navigate("/");
        } else {
          throw new Error(t("sign_in.status.failed"));
        }
      } catch (error) {
        alert({
          type: "error",
          message: t("sign_in.status.failed"),
          description: t("sign_in.status.failed_description"),
        });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, navigate, t]
  );

  const handleForgotPassword = (e) => {
    Modal.info({
      title: "Information",
      content: (
        <p>{t("forgot.status.info")}</p>
      ),
      onOk() { },
    });
  };

  return { isLoading, handleLogin, handleForgotPassword, initialValues };
}

export default useLogin;
