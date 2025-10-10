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

  const [pagination, setPagination] = useState({ page: 0, size: 25 });
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
        dispatch(setIsLoading(true));
        setProductCodes(params.productCodes);
        const response = await services.getWarehouseAndOrderList(params);
        dispatch(setWarehouseAndOrderList(response?.data?.data || []));
        setPagination({
          page: response.data.totalPages - 1,
          total: response.data.totalItems,
          size: pagination.size,
        });

        setEstimatedTime(maxEtaStr(response?.data?.data));
      } catch (error) {
        console.error("Error fetching OEEList:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, productCodes]
  );

  const handleOnChange = useCallback((values) => {
    getWarehouseAndOrderList({ pagination: { page: 0, size: 25 }, productCodes: values });
  }, []
  );

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
