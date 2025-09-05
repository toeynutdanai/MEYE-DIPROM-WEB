import { Modal } from "antd";
import { Alert } from "components/elements";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { generateRandomString } from "utils/helper";
import * as services from "../services/bloodPressureApi";
import {
  setIsLoading,
  setUserDropDownNameHn,
} from "../slices/bloodPressureSlice";

function useBloodPressureEdit() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.bloodPressure.isLoading);
  const userDropDownNameHn = useSelector(
    (state) => state.bloodPressure.userDropDownNameHn
  );
  const [bloodPressure, setBloodPressure] = useState({});
  const currentId = window.localStorage.getItem("id");
  const { id } = useParams();
  const navigate = useNavigate();

  const getBloodPressure = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const values = {
        bloodPressureId: id,
        requestId: generateRandomString(),
      };
      const response = await services.getBloodPressure(values);
      setBloodPressure(response.data);
    } catch (error) {
      Alert({ type: "error", resultObject: error });
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [id, dispatch]);

  const getUserDropDown = useCallback(async () => {
    try {
      const response = await services.getUserDropDown({
        requestId: generateRandomString(),
      });
      const formattedUserDropDownNameHn = response.data.map((user) => ({
        label: `${user.firstName} ${user.lastName} ( ${user.hospitalNumber} )`,
        value: user.id,
      }));
      dispatch(setUserDropDownNameHn(formattedUserDropDownNameHn || []));
      return formattedUserDropDownNameHn;
    } catch (error) {
      console.error("Error fetching user dropdown:", error);
    }
  }, [dispatch]);

  const onSubmit = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: <p>{t("blood_pressure.message.edit")}</p>,
          async onOk() {
            const response = await services.updateBloodPressureById({
              requestId: generateRandomString(),
              bloodPressureId: values.id,
              actionId: currentId,
              userId: values.createBy,
              systolicPressure: values.systolicPressure,
              diastolicPressure: values.diastolicPressure,
              pulseRate: values.pulseRate,
            });
            Alert({
              message: response.data.status.details[0].value || "Success",
            });
            navigate("/blood_pressure");
          },
          okText: t("common.confirm"),
          cancelText: t("common.cancel"),
        });
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [currentId, dispatch, navigate, t]
  );

  useEffect(() => {
    getBloodPressure();
    getUserDropDown();
  }, [getBloodPressure, getUserDropDown]);

  return {
    bloodPressure,
    isLoading,
    userDropDownNameHn,
    onSubmit,
  };
}

export default useBloodPressureEdit;
