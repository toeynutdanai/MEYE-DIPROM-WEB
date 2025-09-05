import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import alert from "components/elements/Alert";
import { generateRandomString } from "utils/helper";
import { signUp } from "../services/signUpApi";
import { setIsLoading, setIsLogin } from "../slices/signUpSlice";
import { useTranslation } from "react-i18next";

function useSignUp() {
  const { t } = useTranslation();
  const isLoading = useSelector((state) => state.signUp.isLoading);
  const isLogin = useSelector((state) => state.signUp.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = useCallback(
    async (values) => {
      try {
        dispatch(setIsLoading(true));
        dispatch(setIsLogin(false));

        const modifiedValues = {
          requestId: generateRandomString(),
          email: values.email,
          password: values.password,
          firstName: values.name,
          lastName: values.surName,
          phoneNumber: values.phone,
          hospitalNumber: generateRandomString(),
        };

        await signUp(modifiedValues);
        dispatch(setIsLogin(true));

        alert({ message: "Success" });
        alert({ message: t("sign_up.status.successful") });
        navigate("/sign_in");
      } catch (error) {
        alert({
          type: "error",
          message: t("sign_up.status.failed"),
          description: t("sign_up.status.failed_description"),
          // resultObject: error,
        });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, navigate, t]
  );

  return {
    isLoading,
    isLogin,
    handleSignUp,
  };
}

export default useSignUp;
