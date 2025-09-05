import { Modal } from "antd";
import { Alert } from "components/elements";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "utils/helper";
import * as services from "../services/bloodPressureApi";
import {
  setBloodPressureList,
  setIsLoading,
  setUserDropDownHn,
  setUserDropDownName,
  setUserDropDownNameHn,
} from "../slices/bloodPressureSlice";
import moment from "moment";
import axios from "axios";

function toParams(params = {}) {
  const { pagination = {}, sortBy = [] } = params;
  return {
    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
    sortBy: sortBy
      .filter((s) => s.order !== undefined)
      .map((s) => ({
        direction: s.order === "descend" ? "desc" : "asc",
        property: s.field,
      })),
  };
}

const paginationReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGINATION":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

function useBloodPressureList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.bloodPressure.isLoading);
  const [isDownloading, setIsDownloading] = useState(false);
  const bloodPressureList = useSelector(
    (state) => state.bloodPressure.bloodPressureList
  );
  const [pagination, paginationDispatch] = useReducer(paginationReducer, {
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filter, setFilter] = useState({});

  const getBloodPressureList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getBloodPressureList({
          requestId: generateRandomString(),
          ...params.pagination,
          size: params?.pagination?.pageSize,
          ...filter,
          sortBy: params.sortBy,
        });

        const formattedBloodPressureList = response.data.content || [];
        dispatch(setBloodPressureList(formattedBloodPressureList));
        paginationDispatch({
          type: "SET_PAGINATION",
          payload: {
            current: params.pagination.page + 1,
            total: response.data.totalItems,
          },
        });
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter]
  );

  const getUserDropDown = useCallback(async () => {
    try {
      const response = await services.getUserDropDown({
        requestId: generateRandomString(),
      });
      const formattedUserDropDownName = response.data.map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id,
      }));
      const formattedUserDropDownHn = response.data.map((user) => ({
        label: `${user.hospitalNumber}`,
        value: user.id,
      }));
      const formattedUserDropDownNameHn = response.data.map((user) => ({
        label: `${user.firstName} ${user.lastName} ( ${user.hospitalNumber} )`,
        value: user.id,
      }));
      dispatch(setUserDropDownName(formattedUserDropDownName || []));
      dispatch(setUserDropDownHn(formattedUserDropDownHn || []));
      dispatch(setUserDropDownNameHn(formattedUserDropDownNameHn || []));
      return formattedUserDropDownName;
    } catch (error) {
      console.error("Error fetching user dropdown:", error);
    }
  }, [dispatch]);

  const handleOnChange = useCallback(
    (tablePagination, tableSorter) => {
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
      paginationDispatch({
        type: "SET_PAGINATION",
        payload: {
          current: tablePagination.current,
          pageSize: tablePagination.pageSize,
          total: pagination.total,
        },
      });
      getBloodPressureList(modifiedParams);
    },
    [getBloodPressureList, filter, pagination.total]
  );

  const handleOnSubmit = useCallback(
    (values) => {
      setFilter(values);
      paginationDispatch({
        type: "SET_PAGINATION",
        payload: {
          current: 1,
          pageSize: pagination.pageSize,
          total: pagination.total,
        },
      });
    },
    [pagination.pageSize, pagination.total]
  );

  const handleOnDelete = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: <p>{t("blood_pressure.message.delete")}</p>,
          async onOk() {
            const response = await services.deleteBloodPressure({
              requestId: generateRandomString(),
              bloodPressureId: values,
            });
            Alert({
              message: response.data.status.details[0].value || "Success",
            });
            getBloodPressureList({
              pagination: {
                page: pagination.current - 1,
                pageSize: pagination.pageSize,
              },
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
    [dispatch, getBloodPressureList, pagination, t]
  );

  const handleDownloadExcel = async () => {
    try {
      dispatch(setIsLoading(true));
      setIsDownloading(true);
      const response = await services.exportExcel();

      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        "bps__" + moment().add(543, "years").format("DD_MM_YYYY") + ".xlsx"
      );
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);

      Alert({ message: "File downloaded successfully" });
    } catch (error) {
      Alert({ type: "error", resultObject: error });
    } finally {
      dispatch(setIsLoading(false));
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    getUserDropDown();
  }, [getUserDropDown]);

  useEffect(() => {
    getBloodPressureList({
      pagination: {
        page: pagination.current - 1,
        pageSize: pagination.pageSize,
      },
    });
  }, [getBloodPressureList, pagination.pageSize, pagination.current]);

  return {
    bloodPressureList,
    isLoading,
    isDownloading,
    pagination,
    filter,
    onChange: handleOnChange,
    onSubmit: handleOnSubmit,
    onClear: () => setFilter({}),
    onDelete: handleOnDelete,
    onDownloadExcel: handleDownloadExcel,
  };
}

export default useBloodPressureList;
