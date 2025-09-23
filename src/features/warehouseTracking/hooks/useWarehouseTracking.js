import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/warehouseTrackingApi";
import { 
    setIsLoading, 
    setWarehouseAndOrderList, 
    setProductDwl,
    setOverviewObj,
    setOEEByMachineList
} from "../slices/warehouseTrackingSlice";

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

function useWarehouseTracking(){
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.warehouseTracking.isLoading);
  const warehouseAndOrderList = useSelector((state) => state.warehouseTracking.warehouseAndOrderList);
  const productDwl = useSelector((state) => state.warehouseTracking.productDwl);
  const overviewObj = useSelector((state) => state.warehouseTracking.overviewObj);

  const [pagination, setPagination] = useState({ page: 0, size: 25 });
  const [filter, setFilter] = useState({});

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
        const response = await services.getWarehouseAndOrderList(params);
        dispatch(setWarehouseAndOrderList(response.data || []));
        setPagination({
          page: response.data.totalPages - 1,
          total: response.data.totalItems,
          size: pagination.size,
        });
      } catch (error) {
        console.error("Error fetching OEEList:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter,pagination.size]
  );

   const handleOnChange = useCallback((values) => {
      getWarehouseAndOrderList({ pagination: { page: 0, size: 25 },param:values });
    },[]
  );

  useEffect(() => {
    getProductDwl();
    getOverviewObj();
  }, [getProductDwl,getOverviewObj]);

  return {
    warehouseAndOrderList,
    productDwl,
    overviewObj,
    isLoading,
    pagination,
    filter,
    onChange: handleOnChange,
  };
}

export default useWarehouseTracking;
