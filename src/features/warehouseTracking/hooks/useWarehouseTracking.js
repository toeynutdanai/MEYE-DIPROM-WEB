import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/warehouseTrackingApi";
import {
  setIsLoading,
  setOverviewObj,
  setProductDwl,
  setWarehouseAndOrderList
} from "../slices/warehouseTrackingSlice";
import moment from "moment";
import { generateRandomString } from "utils/helper";

const k = (s) => (s ? s.split("-").reverse().join("") : "");

const maxEtaStr = (list) =>
          (list ?? []).reduce((best, cur) =>
            !best || k(cur.estimatedTimeArrival) > k(best.estimatedTimeArrival) ? cur : best
            , null)?.estimatedTimeArrival ?? "";

function useWarehouseTracking() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.warehouseTracking.isLoading);
  const warehouseAndOrderList = useSelector((state) => state.warehouseTracking.warehouseAndOrderList);
  const productDwl = useSelector((state) => state.warehouseTracking.productDwl);
  const overviewObj = useSelector((state) => state.warehouseTracking.overviewObj);

  const [productCodes, setProductCodes] = useState([]);

  // const [pagination, setPagination] = useState({ current: 0, pageSize: 25, total: 0 });
  const [pagination, setPagination] = useState({ page: 0, size: 25,total:0 });
  const [filter, setFilter] = useState({});
  const [estimatedTime, setEstimatedTime] = useState("");

  const getProductDwl = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getProductDwl(params);
        dispatch(setProductDwl(response.data.data || []));

      } catch (error) {
        console.error("Error fetching MachineDwl:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [setProductDwl]
  );

  const getOverviewObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getOverviewObj();
        dispatch(setOverviewObj(response.data || {}));

      } catch (error) {
        console.error("Error fetching Overview:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [setOverviewObj]
  );

  const getWarehouseAndOrderList = useCallback(
    async (params = {}) => {
      try {
      //   const payload = {
      //   requestId: generateRandomString(),
      //   productCodes: params.productCodes ?? "",
      //   page: pagination.current -1,
      //   size: pagination.pageSize,
      // };
        dispatch(setIsLoading(true));
        setProductCodes(params.productCodes);
        const response = await services.getWarehouseAndOrderList(params);
        dispatch(setWarehouseAndOrderList(response?.data?.data?.content || []));
        setPagination(() => ({
          page: response.data?.data?.currentPage,
          total: response.data?.data?.totalItems ?? 0,
          size: params.size,
        }));

        setEstimatedTime(response?.data?.data?.content.length>0? response?.data?.data?.content[0].finalEstimatedTimeArrivalDate : '');
     } catch (error) {
        console.error("Error fetching OEEList:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, productCodes]
  );

  // const handleOnChange = useCallback((values) => {
  //   getWarehouseAndOrderList({ pagination: { page: 0, size: 25 }, productCodes: values });
  // }, []
  // );

   const handleOnChange = useCallback((values) => {
    const current = values?.current ?? 1;
    const nextSize = values?.pageSize ?? 25;
    const sizeChanged = nextSize !== pagination.size;
    const product = Array.isArray(values) ? values : productCodes;
    if(Array.isArray(values)){
      getWarehouseAndOrderList({ page: 0, size: nextSize, productCodes: values });
    }else{
      getWarehouseAndOrderList({ page: sizeChanged ? 0 : Math.max(0, current - 1), size: nextSize, productCodes: product });
    }
    

  });

  useEffect(() => {
    getProductDwl();
    getOverviewObj();
    getWarehouseAndOrderList();
  }, [getProductDwl, getOverviewObj]);

  const handleDownloadExcel = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.downloadWarehouseTracking({
        productCodes: productCodes,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        "warehouseTracking" + moment().add(543, "years").format("DD_MM_YYYY") + ".csv"
      );
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return {
    warehouseAndOrderList,
    productDwl,
    estimatedTime,
    overviewObj,
    isLoading,
    pagination,
    filter,
    productCodes,
    setProductCodes,
    onChange: handleOnChange,
    handleDownloadExcel
  };
}

export default useWarehouseTracking;
