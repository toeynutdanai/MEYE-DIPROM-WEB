import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/compareDashboardApi";
import { 
  setIsLoading, 
  setCompareProductList, 
  setActualVsPlanObj, 
  setWasteProductCompareObj,
  setProductDwl,
  setOverviewObj} from "../slices/compareDashboardSlice";
// import { compareDashboardActions } from "../slices/compareDashboardSlice";
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
  const isLoading = useSelector((state) => state.compareDashboard.isLoading);
  const compareProductList = useSelector((state) => state.compareDashboard.compareProductList);
  const actualVsPlanObj = useSelector((state) => state.compareDashboard.actualVsPlanObj);
  const wasteProductCompareObj = useSelector((state) => state.compareDashboard.wasteProductCompareObj);
  const productDwl = useSelector((state) => state.compareDashboard.productDwl);
  const overviewObj = useSelector((state) => state.compareDashboard.overviewObj);

  const [pagination, setPagination] = useState({ page: 0, size: 25 });
  const [filter, setFilter] = useState({});

  const getCompareProductList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getCompareProduct(params);
        dispatch(setCompareProductList(response.data || []));
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
    [dispatch, filter,pagination.size]
  );

  const getActualVsPlanObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getActualVsPlan(params);
        dispatch(setActualVsPlanObj(response.data || []));
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter]
  );

  const getWasteProductCompareObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getWasteProductCompare(params);
        dispatch(setWasteProductCompareObj(response.data || []));
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter]
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

  //  const handleOnChange = useCallback(
  //   ({ period, selectedMonth, selectedYear, selectProduct }) => {
  //     console.log("handleOnChange ถูกเรียกแล้ว!");
  //     const newFilter = {
  //       ...filter,
  //       period,
  //       selectedMonth,
  //       selectedYear,
  //       selectProduct,
  //     };
  //     dispatch(setFilter(newFilter));
  //   },
  //   [dispatch, filter]
  // );


  // const handleOnSubmit = useCallback((values) => {
  //     setFilter(values);
  //   },[setFilter]
  // );

   const handleOnChange = useCallback((values) => {
      console.log("handleOnChange ถูกเรียกแล้ว! "+values);
      // setFilter(values);
      getCompareProductList({ pagination: { page: 0, size: 25 },param:values });
      getActualVsPlanObj({param:values});
      getWasteProductCompareObj({param:values});
    },[]
  );

  //  const handleOnChange = useCallback(() => {
  //     console.log("handleOnChange ถูกเรียกแล้ว!");
  //     // setFilter(values);
  //   },[setFilter]
  // );

  // const handleOnChangeFilter = useCallback(
  //   (values) => {
  //     console.log("handleOnChange ถูกเรียกแล้ว!");
  //     const { period, selectedMonth, selectedYear, selectProduct } = values;

  //     if (period && selectProduct) {
  //       const scopeType = period === 'monthly' ? 'monthly' : 'yearly';
  //       const apiParams = {
  //         pagination: { page: 0, size: 25 },
  //         param: {
  //           scopeType: scopeType,
  //           period: period === 'monthly' ? selectedMonth : selectedYear,
  //           productCode: selectProduct,
  //         }
  //       };
  //       getCompareProductList(apiParams);
  //     }
  //   },
  //   [getCompareProductList]
  // );

  // useEffect(() => {
  //   getCompareProductList({ pagination: { page: 0, size: 25 },param:{scopeType:"monthly",period:"2025-01",productCode:"P001"} });
  // }, [getCompareProductList]);

  useEffect(() => {
    getProductDwl();
    getOverviewObj();
  }, [getProductDwl,getOverviewObj]);

  // const handleOnSubmit = useCallback(
  //   (values) => {
  //     console.log("handleOnSubmit ถูกเรียกแล้ว!");
  //     const { period, selectedMonth, selectedYear, selectProduct } = values;

  //     // ตรวจสอบว่ามีข้อมูลครบถ้วนก่อนเรียก API
  //     if (period && selectProduct) {
  //       const scopeType = period === 'monthly' ? 'monthly' : 'yearly';
  //       const apiParams = {
  //         pagination: { page: 0, size: 25 },
  //         param: {
  //           scopeType: scopeType,
  //           period: period === 'monthly' ? selectedMonth : selectedYear,
  //           productCode: selectProduct,
  //         }
  //       };
  //       getCompareProductList(apiParams);
  //     }
  //   },
  //   [getCompareProductList]
  // );

  return {
    compareProductList,
    actualVsPlanObj,
    wasteProductCompareObj,
    productDwl,
    overviewObj,
    isLoading,
    pagination,
    filter,
    onChange: handleOnChange,
    // onSubmit: handleOnSubmit,
    // onClear: () => setFilter({}),
    // onDelete: handleOnDelete,
  };
}

export default useCompareDashboard;
