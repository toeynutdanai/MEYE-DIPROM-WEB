import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Alert } from "components/elements";

import { generateRandomString } from "utils/helper";
import * as services from "../services/shiftsApi";
import {
  setIsLoading,
  setEmailList,
} from "../slices/notificationTemplateSlice";

function useEmailsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCompany = useSelector((state) => state.company.currentCompany);
  const isLoading = useSelector((state) => state.attendance.isLoading);
  const emailsList = useSelector((state) => state.attendance.emailsList);
  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const getNotificationEmails = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getAttendanceShifts({
          ...params,
          requestId: generateRandomString(),
          companyId: currentCompany,
        });
        dispatch(setEmailList(response.data.attendanceShiftResp || []));
        setPagination({
          ...pagination,
          range: [
            (pagination.page - 1) * pagination.size + 1,
            Math.min(
              pagination.page * pagination.size,
              response.data.totalItems
            ),
          ],
          total: response.data.totalItems,
        });
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [currentCompany, pagination, dispatch]
  );

  const onCreate = useCallback(() => {
    navigate("/configuration/attendance/shift/create");
  }, [navigate]);

  const onStatus = useCallback(
    async (val, record) => {
      try {
        dispatch(setIsLoading(true));
        const statusFlag = val ? "ACTIVE" : "INACTIVE";
        const values = {
          attendanceSettingShiftId: record.id,
          requestId: generateRandomString(),
          companyId: currentCompany,
          statusFlag,
        };
        await services.manageStatusAttendanceShifts(values);
        Alert({ message: "Success" });
        const modifiedShiftsList = emailsList.map((s) => {
          if (s.id === record.id) {
            return { ...s, statusFlag };
          }
          return s;
        });
        dispatch(setEmailList(modifiedShiftsList));
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [emailsList, currentCompany, dispatch]
  );

  const onEdit = useCallback(
    (record) => {
      if (record.id) {
        navigate(`/configuration/attendance/shift/${record.id}/edit`);
      }
    },
    [navigate]
  );

  const onDelete = useCallback(
    async (record) => {
      try {
        dispatch(setIsLoading(true));
        const values = {
          attendanceSettingShiftId: record.id,
          requestId: generateRandomString(),
          companyId: currentCompany,
          statusFlag: "DELETE",
        };
        await services.manageStatusAttendanceShifts(values);
        Alert({ message: "Success" });
        const modifiedShiftsList = emailsList.map((s) => s.id !== record.id);
        dispatch(setEmailList(modifiedShiftsList));
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [emailsList, currentCompany, dispatch]
  );

  useEffect(() => {
    if (typeof currentCompany !== "object") {
      getNotificationEmails({
        page: 0,
        size: 10,
      });
    }
  }, [currentCompany]);

  return {
    isLoading,
    pagination,
    emailsList,
    onCreate,
    onStatus,
    onEdit,
    onDelete,
  };
}

export default useEmailsList;
