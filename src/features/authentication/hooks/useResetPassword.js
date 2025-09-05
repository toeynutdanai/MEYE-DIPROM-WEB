import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import alert from "components/elements/Alert";

import { useQuery } from "hooks";
import { generateRandomString } from "utils/helper";
import { resetPassword } from "../services/passwordApi";
import { setIsLoading } from "../slices/passwordSlice";

function useReset() {
  const isLoading = useSelector((state) => state.password.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const doReset = useCallback(
    async (values) => {
      try {
        dispatch(setIsLoading(true));
        const token = query.get("token");
        if (token) {
          const modifiedValues = {
            ...values,
            token,
            requestId: generateRandomString(),
          };
          await resetPassword(modifiedValues);
          alert({ type: "success", message: "Success" });
          navigate("/sign_in");
        } else {
          alert({ type: "error", message: "Token not found." });
        }
      } catch (error) {
        alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [query, dispatch, navigate]
  );

  return { isLoading, doReset };
}

export default useReset;
