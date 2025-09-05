import { useDispatch, useSelector } from "react-redux";

import alert from "components/elements/Alert";

import { forgetPassword } from "../services/passwordApi";
import { setIsLoading } from "../slices/passwordSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function useForgotPassword() {
  const { t } = useTranslation();
  const isLoading = useSelector((state) => state.password.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doForgotPassword = async (values) => {
    try {
      dispatch(setIsLoading(true));
      await forgetPassword(values);
      alert({ message: t("forgot.status.successful") });
      navigate('/sign_in');
    } catch (error) {
      alert({
        type: "error",
        message: t("forgot.status.failed"),
        description: t("forgot.status.failed_description"),
        // resultObject: error,
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const onCancel = () => {
    window.history.back();
  };

  return { isLoading, doForgotPassword, onCancel };
}

export default useForgotPassword;
