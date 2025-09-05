import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { generateRandomString } from "utils/helper";
import * as services from "../services/patientApi";
import { setBloodPressureList, setIsLoading, setPatient } from "../slices/patientSlice";
import { Alert } from "components/elements";

function usePatient() {
  const { id } = useParams();
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.patient.isLoading);
  const patient = useSelector((state) => state.patient.patient);
  const bloodPressureList = useSelector((state) => state.patient.bloodPressureList);
  const currentId = window.localStorage.getItem("id");

  const getPatient = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.getPatientById({
        requestId: generateRandomString(),
        userId: id,
      });
      dispatch(setPatient(response.data || []));
    } catch (error) {
      console.error("Error fetching patient list:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, id]);

  const getBloodPressureByCreateBy = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.getBloodPressureByCreateBy({
        requestId: generateRandomString(),
        userId: id,
      });
      dispatch(setBloodPressureList(response.data || []));
    } catch (error) {
      console.error("Error fetching blood pressure:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, id]);

  const handleOnCheckboxChange = useCallback(async (verified, id) => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.updateUserCheckState({
        requestId: generateRandomString(),
        patientId: id,
        verified: verified,
        actionId: currentId
      });
      Alert({ message: response.data.status.details[0].value || "Success" });
      getPatient()
    } catch (error) {
      Alert({ type: "error", resultObject: error });
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, getPatient]);

  useEffect(() => {
    getPatient();
    getBloodPressureByCreateBy();
  }, [getPatient, getBloodPressureByCreateBy]);


  return {
    patient,
    isLoading,
    bloodPressureList,
    onCheckboxChange: handleOnCheckboxChange,
  };
}

export default usePatient;
