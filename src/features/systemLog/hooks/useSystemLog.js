import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/logApi";
import { setIsLoading } from "../slices/logSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
dayjs.extend(customParseFormat);
dayjs.locale("en");

function getResponsiveTableWidth() {
  if (typeof window === "undefined") return "100%";
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

function useSystemLog(){
    const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.log.isLoading);
  const [pagination, setPagination] = useState({ page: 0, size: 25,total:0 });
  const [filter, setFilter] = useState({});
  const [logType, setLogType] = useState("Access Log"); // 'Access Log' | 'Interface Log'
  const [logAccessList, setLogAccessList] = useState([]); 
  const [logInterfaceList, setLogInterfaceList] = useState([]); 
  const [search, setSearch] = useState({date:"",username:"",activity:"",fileName:""});
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());

  const getLogAccessList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getAccessLog(params);
        setLogAccessList(response.data.data.content || [])
        // dispatch(setLogAccessList(response.data.data || []));
        setPagination({
          page: response.data.data.currentPage,
          total: response.data.data.totalItems,
          size: params.size,
        });
      } catch (error) {
        console.error("Error fetching LogList:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter, pagination.page, pagination.size]
  );

  const getLogInterfaceList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getInterfaceLog(params);
        setLogInterfaceList(response?.data?.data?.content || [])
        // dispatch(setLogAccessList(response.data.data || []));
        setPagination({
          page: response?.data?.data?.currentPage,
          total: response?.data?.data?.totalItems,
          size: params.size,
        });
      } catch (error) {
        console.error("Error fetching getLogInterfaceList:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter, pagination.size]
  );

  const handleDownloadExcel = async (logId,interfaceCode) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.downloadLogInterfaceFail({
          logId,
          interfaceCode
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
  
        link.setAttribute(
          "download",
          "interfaceLogFail_" + moment().add(543, "years").format("DD_MM_YYYY") + ".csv"
        );
        document.body.appendChild(link);
        link.click();
  
        link.parentNode.removeChild(link);
      } catch (error) {
      } finally {
        dispatch(setIsLoading(false));
      }
    };

  const handleOnClick = useCallback(() => {
    if (logType === 'Access Log') {
      getLogAccessList({  ...search,page: 0, size: 25});
    } else {
      getLogInterfaceList({  ...search,page: 0, size: 25});
    }
  },[logType, search, pagination.size, getLogAccessList, getLogInterfaceList]
  );

  // ----- Handlers
  const handleOnChange = useCallback((tablePagination) => {
    const current = tablePagination?.current ?? 1;
    const nextSize = tablePagination?.pageSize ?? 25;
    const sizeChanged = nextSize !== pagination.size;

    if (logType === 'Access Log') {
      getLogAccessList({  ...search,page: sizeChanged ? 0 : Math.max(0, current - 1), size: nextSize});
    } else {
      getLogInterfaceList({  ...search,page: sizeChanged ? 0 : Math.max(0, current - 1), size: nextSize});
    }
  });

  useEffect(() => {   
    handleOnClick(); 
  }, [logType]);

    // responsive width
    useEffect(() => {
      const onResize = () => setTableWidth(getResponsiveTableWidth());
      if (typeof window !== "undefined") {
        window.addEventListener("resize", onResize);
        onResize();
        return () => window.removeEventListener("resize", onResize);
      }
    }, []);

  return {
    isLoading,
    pagination,
    filter,
    onChange: handleOnChange,
    onClick: handleOnClick,
    handleDownloadExcel: handleDownloadExcel,
    logAccessList,
    logInterfaceList,
    logType,
    search,
    setLogType,
    setSearch,
    tableWidth
  };
}

export default useSystemLog;
