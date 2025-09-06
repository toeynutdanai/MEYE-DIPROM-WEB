import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import session from "utils/session";

import alert from "components/elements/Alert";
import { login } from "../services/loginApi";
import { setIsLoading, setIsLogin, setProfile } from "../slices/loginSlice";
import { useTranslation } from "react-i18next";

function useLogin() {
  const { t } = useTranslation();
  const isLoading = useSelector((state) => state.login.isLoading);
  const isLogin = useSelector((state) => state.login.isLogin);
  const profile = useSelector((state) => state.login.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (values) => {
      try {
        dispatch(setIsLoading(true));
        dispatch(setIsLogin(false));

        const modifiedValues = {
          // type: "text",
          username: values.username,
          password: values.password,
        };

        const response = await login(modifiedValues);
        const token = response.data.token || null;

        if (token) {
          session.setAuthToken(token);

          if (values.rememberMe === "Y") {
            window.localStorage.setItem("rememberUser", values.username);
          } else {
            window.localStorage.removeItem("rememberUser");
          }

          window.localStorage.setItem("name", response.data.name);
          window.localStorage.setItem("id", response.data.id);

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
          // resultObject: error,
        });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, navigate, t]
  );

  return { isLoading, isLogin, profile, handleLogin };
}

export default useLogin;
