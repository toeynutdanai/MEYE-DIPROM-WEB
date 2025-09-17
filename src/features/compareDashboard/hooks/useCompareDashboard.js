import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/compareDashboardApi";
import { setIsLoading, setCompareProductList, setActualVsPlanList, setWasteProductCompareList ,setProductDwl} from "../slices/compareDashboardSlice";
import { useNavigate } from "react-router-dom";

// function toParams(params = {}) {
//   const { pagination = {}, sortBy = [] } = params;
//   return {
//     pagination: {
//       page: pagination.page,
//       size: pagination.pageSize,
//     },
//     sortBy: sortBy
//       .filter((s) => s.order !== undefined)
//       .map((s) => ({
//         direction: s.order === "descend" ? "desc" : "asc",
//         property: s.field,
//       })),
//   };
// }

function useCompareDashboard(){
    const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.log.isLoading);
  const compareProductList = useSelector((state) => state.compareDashboard.compareProductList);
  const actualVsPlanList = useSelector((state) => state.compareDashboard.actualVsPlanList);
  const wasteProductCompareList = useSelector((state) => state.compareDashboard.wasteProductCompareList);
  const productDwl = useSelector((state) => state.compareDashboard.productDwl);
  // const currentId = window.localStorage.getItem("id");
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [filter, setFilter] = useState({});

  const getCompareProductList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getCompareProduct();
        dispatch(setCompareProductList(response.data.data || []));
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
    // [dispatch, filter, pagination.size]
    [dispatch, filter, 10]
  );

    const getProductDwl = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getProductDwl();
        dispatch(setProductDwl(response.data.data || []));
        
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [setProductDwl]
  );

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

  useEffect(() => {
    getCompareProductList({ pagination: { page: 0, size: 10 } });
  }, [getCompareProductList]);

  useEffect(() => {
    getProductDwl();
  }, [getProductDwl]);

  return {
    compareProductList,
    actualVsPlanList,
    wasteProductCompareList,
    productDwl,
    isLoading,
    pagination,
    filter,
    // onChange: handleOnChange,
    // onSubmit: getLogList,
    // onClear: () => setFilter({}),
    // onDelete: handleOnDelete,
  };
}

export default useCompareDashboard;
