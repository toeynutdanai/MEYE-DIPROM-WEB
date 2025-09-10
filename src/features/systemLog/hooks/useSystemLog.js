import { Modal } from "antd";
import alert from "components/elements/Alert";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "utils/helper";
import * as services from "../services/adminApi";
import { setIsLoading, setAdminList } from "../slices/adminSlice";
import session from "utils/session";
import { useNavigate } from "react-router-dom";

function toParams(params = {}) {
  // const { pagination = {}, sortBy = [] } = params;
  // return {
  //   pagination: {
  //     page: pagination.page,
  //     size: pagination.pageSize,
  //   },
  //   sortBy: sortBy
  //     .filter((s) => s.order !== undefined)
  //     .map((s) => ({
  //       direction: s.order === "descend" ? "desc" : "asc",
  //       property: s.field,
  //     })),
  // };
}

function useSystemLog(){
  //   const { t } = useTranslation();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const isLoading = useSelector((state) => state.admin.isLoading);
  // const adminList = useSelector((state) => state.admin.adminList);
  // const currentId = window.localStorage.getItem("id");
  // const [pagination, setPagination] = useState({ page: 0, size: 10 });
  // const [filter, setFilter] = useState({});

  // const getAdminList = useCallback(
  //   async (params = {}) => {
  //     try {
  //       dispatch(setIsLoading(true));
  //       const response = ''
  //       // const response = await services.getAdminList({
  //       //   requestId: generateRandomString(),
  //       //   ...params.pagination,
  //       //   ...filter,
  //       //   sortBy: params.sortBy,
  //       // });
  //       dispatch(setAdminList(response.data.content || []));
  //       setPagination({
  //         page: response.data.totalPages - 1,
  //         total: response.data.totalItems,
  //         size: pagination.size,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching patient list:", error);
  //     } finally {
  //       dispatch(setIsLoading(false));
  //     }
  //   },
  //   [dispatch, filter, pagination.size]
  // );

  // const handleOnChange = useCallback(
  //   (tablePagination, tableSorter) => {
  //     setPagination(tablePagination);
  //     const modifiedSorter = Array.isArray(tableSorter)
  //       ? [...tableSorter]
  //       : [tableSorter];
  //     const modifiedParams = toParams({
  //       pagination: {
  //         page: tablePagination.current - 1,
  //         pageSize: tablePagination.pageSize,
  //       },
  //       sortBy: modifiedSorter,
  //       ...filter,
  //     });
  //     setPagination({
  //       page: tablePagination.current - 1,
  //       size: tablePagination.pageSize,
  //     });
  //     getAdminList(modifiedParams);
  //   },
  //   [filter, getAdminList]
  // );

  // const handleOnSubmit = useCallback(
  //   (values) => {
  //     setFilter(values);
  //   },
  //   [setFilter]
  // );

  // const handleOnDelete = useCallback(
  //   async (values) => {
  //     try {
  //       Modal.confirm({
  //         title: t("dialog.confirmation.header"),
  //         content: <p>{t("patient.message.delete")}</p>,
  //         async onOk() {
  //           const response = ''
  //           // const response = await services.deleteAdmin({
  //           //   requestId: generateRandomString(),
  //           //   userId: values,
  //           // });
  //           alert({
  //             message: response.data.status.details[0].value || "Success",
  //           });
  //           if (currentId === values) {
  //             session.removeAuthToken();
  //             navigate("/sign_in");
  //           }
  //           getAdminList({
  //             pagination: { page: pagination.page, size: pagination.size },
  //           });
  //         },
  //         okText: t("common.confirm"),
  //         cancelText: t("common.cancel"),
  //       });
  //     } catch (error) {
  //       alert({ type: "error", resultObject: error });
  //     } finally {
  //       dispatch(setIsLoading(false));
  //     }
  //   },
  //   [dispatch, getAdminList, pagination.page, pagination.size, t, currentId, navigate]
  // );

  // useEffect(() => {
  //   getAdminList({ pagination: { page: 0, size: 10 } });
  // }, [getAdminList]);

  return {
    // adminList,
    // isLoading,
    // pagination,
    // filter,
    // onChange: handleOnChange,
    // onSubmit: handleOnSubmit,
    // onClear: () => setFilter({}),
    // onDelete: handleOnDelete,
  };
}

export default useSystemLog;
