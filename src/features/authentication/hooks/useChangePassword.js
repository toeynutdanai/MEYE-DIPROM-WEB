import { useDispatch, useSelector } from "react-redux";

import alert from "components/elements/Alert";

import { generateRandomString } from "utils/helper";
import { changePassword } from "../services/passwordApi";
import { setIsLoading } from "../slices/passwordSlice";

function useChangePassword() {
  const isLoading = useSelector((state) => state.password.isLoading);
  const dispatch = useDispatch();

  const doChangePassword = async (values) => {
    try {
      dispatch(setIsLoading(true));
      const modifiedValues = {
        ...values,
        requestId: generateRandomString(),
      };
      await changePassword(modifiedValues);
      alert({ message: "Success" });
      dispatch(setIsLoading(true));
      window.history.back();
    } catch (error) {
      alert({ type: "error", resultObject: error });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const onCancel = () => {
    window.history.back();
  };

  return { isLoading, doChangePassword, onCancel };
}

export default useChangePassword;
