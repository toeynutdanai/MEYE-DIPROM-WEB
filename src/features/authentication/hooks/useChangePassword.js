import { useDispatch, useSelector } from "react-redux";
import { Modal} from "antd";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify"; // ป้องกัน script injection

import alert from "components/elements/Alert";

import { generateRandomString } from "utils/helper";
import { changePassword } from "../services/passwordApi";
import { setIsLoading } from "../slices/passwordSlice";
import session from "utils/session";

function useChangePassword() {
  const isLoading = useSelector((state) => state.password.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doChangePassword = async (values) => {
  try {

    const cleanOldPassword = DOMPurify.sanitize(values.oldPassword || "");
    const cleanNewPassword = DOMPurify.sanitize(values.newPassword || "");
    const cleanConfirmPassword = DOMPurify.sanitize(values.newPasswordConfirm || "");

    if ( cleanOldPassword.trim() !== "" &&
        (cleanOldPassword === cleanNewPassword ||
        cleanOldPassword === cleanConfirmPassword)
    ) {
    alert({
      type: "error",
      message: "Duplicate Old Password",
      description: "Your new password cannot be the same as your old password.",
      });
      dispatch(setIsLoading(false));
      return;
    }

    if (cleanNewPassword !== cleanConfirmPassword) {
      alert({
        type: "error",
        message: "Password Mismatch",
        description: "New password and confirmation do not match.",
      });
      dispatch(setIsLoading(false));
      return;
    }

    if (cleanNewPassword.length < 8) {
      alert({
        type: "error",
        message: "Weak Password",
        description: "Password must be at least 8 characters.",
      });
      dispatch(setIsLoading(false));
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$+\-<>@_])[A-Za-z\d!#$+\-<>@_]{8,}$/;
    if (!passwordRegex.test(cleanNewPassword)) {
      alert({
        type: "error",
        message: "Weak Password",
        description:
          "Password must contain at least one uppercase letter, one number, and one special character.",
      });
      dispatch(setIsLoading(false));
      return;
    }


    dispatch(setIsLoading(true));
    const modifiedValues = {
      ...values,
      requestId: generateRandomString(),
    };

    Modal.confirm({
      title: "Confirm Change Password",
      content: <p>Are you sure you want to change your password and log out?</p>,
      okText: "CONFIRM",
      cancelText: "CANCEL",
      async onOk() {
        try {
          const res = await changePassword(modifiedValues);
          if (res?.data?.status === 200) {
            alert({
              type: "success",
              message: "Success",
              description: "Your password has been successfully changed.",
            });
            session.removeAuthToken();
            navigate("/sign_in");
          }else{
            alert({
              type: "error",
              message: "Error",
              description:
                "The information is incorrect. Please check and correct it again.",
            });
          }
          
        } catch (error) {
          alert({
            type: "error",
            message: "Error",
            description:
              "The information is incorrect. Please check and correct it again.",
          });
        } finally {
          dispatch(setIsLoading(false));
        }
      },
      onCancel() {
        dispatch(setIsLoading(false));
      },
    });
  } catch (error) {
    alert({
      type: "error",
      message: "Error",
      description: "Unexpected error occurred. Please try again.",
    });
    dispatch(setIsLoading(false));
  }
};

  const onCancel = () => {
    window.history.back();
  };

  return { isLoading, doChangePassword, onCancel };
}

export default useChangePassword;
