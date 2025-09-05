import { Modal } from "antd";
import { Alert } from "components/elements";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "utils/helper";
import * as services from "../services/patientApi";
import { setIsLoading, setPatientList } from "../slices/patientSlice";

function toParams(params = {}) {
  const { pagination = {}, sortBy = [] } = params;
  return {
    pagination: {
      page: pagination.page,
      size: pagination.pageSize,
    },
    sortBy: sortBy
      .filter((s) => s.order !== undefined)
      .map((s) => ({
        direction: s.order === "descend" ? "desc" : "asc",
        property: s.field,
      })),
  };
}

function usePatientList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.patient.isLoading);
  const patientList = useSelector((state) => state.patient.patientList);
  const currentId = window.localStorage.getItem("id");
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [filter, setFilter] = useState({age: [1, 120]});

  const getPatientList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getPatientList({
          requestId: generateRandomString(),
          ...params.pagination,
          ...filter,
          sortBy: params.sortBy,
        });
        dispatch(setPatientList(response.data.content || []));
        setPagination({
          page: response.data.totalPages - 1,
          total: response.data.totalItems,
          size: pagination.size,
        });
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter, pagination.size]
  );

  const handleOnChange = useCallback(
    (tablePagination, tableSorter) => {
      setPagination(tablePagination);
      const modifiedSorter = Array.isArray(tableSorter)
        ? [...tableSorter]
        : [tableSorter];
      const modifiedParams = toParams({
        pagination: {
          page: tablePagination.current - 1,
          pageSize: tablePagination.pageSize,
        },
        sortBy: modifiedSorter,
        ...filter,
      });
      setPagination({
        page: tablePagination.current - 1,
        size: tablePagination.pageSize,
      });
      getPatientList(modifiedParams);
    },
    [filter, getPatientList]
  );

  const handleOnSubmit = useCallback(
    (values) => {
      const [ageFrom, ageTo] = values.age || [];
  
      const filter = {
        ...values,
        ageFrom,
        ageTo,
      };
  
      delete filter.age; // ลบ age เดิมที่เป็น array
  
      setFilter(filter);
    },
    [setFilter]
  );  

  const handleOnDelete = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: <p>{t("blood_pressure.message.delete")}</p>,
          async onOk() {
            const response = await services.deletePatient({
              requestId: generateRandomString(),
              userId: values,
            });
            Alert({
              message: response.data.status.details[0].value || "Success",
            });
            getPatientList({
              pagination: { page: pagination.page, size: pagination.size },
            });
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
    [dispatch, getPatientList, pagination.page, pagination.size, t]
  );

  const handleOnCheckboxChange = useCallback(
    async (verified, id) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.updateUserCheckState({
          requestId: generateRandomString(),
          patientId: id,
          verified: verified,
          actionId: currentId,
        });
        Alert({ message: response.data.status.details[0].value || "Success" });
        getPatientList({
          pagination: { page: pagination.page, size: pagination.size },
        });
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, getPatientList, pagination]
  );

  useEffect(() => {
    getPatientList({ pagination: { page: 0, size: 10 } });
  }, [getPatientList]);

  return {
    patientList,
    isLoading,
    pagination,
    filter,
    onChange: handleOnChange,
    onSubmit: handleOnSubmit,
    onClear: () => setFilter({age: [1, 120]}),
    onDelete: handleOnDelete,
    onCheckboxChange: handleOnCheckboxChange,
  };
}

export default usePatientList;
