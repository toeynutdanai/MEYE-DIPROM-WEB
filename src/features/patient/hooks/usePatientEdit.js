import { Modal } from "antd";
import { Alert } from "components/elements";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { generateRandomString } from "utils/helper";
import * as services from "../services/patientApi";
import { setIsLoading } from "../slices/patientSlice";

function usePatientEdit() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.patient.isLoading);
  const [patient, setPatient] = useState({});
  const currentId = window.localStorage.getItem("id");
  const { id } = useParams();
  const navigate = useNavigate();

  const getPatient = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const values = {
        userId: id,
        requestId: generateRandomString(),
      };
      const response = await services.getPatientById(values);
      setPatient(response.data);
    } catch (error) {
      Alert({ type: "error", resultObject: error });
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [id, dispatch]);

  const onSubmit = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: <p>{t("patient.message.edit")}</p>,
          async onOk() {
            const response = await services.updateUserById({
              requestId: generateRandomString(),
              actionId: currentId,
              userId: values.id,
              email: values.email,
              hospitalNumber: values.hospitalNumber,
              phoneNumber: values.phoneNumber,
              firstName: values.firstName,
              lastName: values.lastName,
              gender: values.gender,
              age: values.age,
            });
            Alert({
              message: response.data.status.details[0].value || "Success",
            });
            navigate("/patient");
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
    [dispatch, t]
  );

  useEffect(() => {
    getPatient();
  }, [getPatient]);

  return {
    patient,
    isLoading,
    onSubmit,
  };
}

export default usePatientEdit;
