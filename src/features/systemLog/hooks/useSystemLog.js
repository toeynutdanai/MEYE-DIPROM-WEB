import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/logApi";
import { setIsLoading, setLogList } from "../slices/logSlice";
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

function useSystemLog(){
    const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.log.isLoading);
  const logList = useSelector((state) => state.log.logList);
  // const currentId = window.localStorage.getItem("id");
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [filter, setFilter] = useState({});

  const getLogList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getSystemLog();
        dispatch(setLogList(response.data.data || []));
        // setPagination({
        //   page: response.data.totalPages - 1,
        //   total: response.data.totalItems,
        //   size: pagination.size,
        // });
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    // [dispatch, filter, pagination.size]
    [dispatch, filter, 10]
  );

  // const handleOnChange = useCallback(
  //   (tablePagination, tableSorter) => {
      
  //   },
  //   [filter]
  // );

  useEffect(() => {
    getLogList({ pagination: { page: 0, size: 10 } });
  }, [getLogList]);

  return {
    logList,
    isLoading,
    pagination,
    filter,
    // onChange: handleOnChange,
  };
}

export default useSystemLog;
