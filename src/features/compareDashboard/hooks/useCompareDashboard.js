// hooks/useCompareDashboard.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/compareDashboardApi";
import {
  setIsLoading,
  setCompareProductList,
  setActualVsPlanObj,
  setWasteProductCompareObj,
  setProductDwl,
  setOverviewObj,
} from "../slices/compareDashboardSlice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.locale("en");

function getResponsiveTableWidth() {
  if (typeof window === "undefined") return "100%";
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

function useCompareDashboard() {
  const dispatch = useDispatch();

  // Redux states
  const isLoading = useSelector((state) => state.compareDashboard.isLoading);
  const compareProductList = useSelector(
    (state) => state.compareDashboard.compareProductList
  );
  const actualVsPlanObj = useSelector(
    (state) => state.compareDashboard.actualVsPlanObj
  );
  const wasteProductCompareObj = useSelector(
    (state) => state.compareDashboard.wasteProductCompareObj
  );
  const productDwl = useSelector((state) => state.compareDashboard.productDwl);
  const overviewObj = useSelector(
    (state) => state.compareDashboard.overviewObj
  );

  // Local states moved from PAGE
  const [pagination, setPagination] = useState({ page: 0, size: 25 });
  const [filter, setFilter] = useState({});
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());

  const [scope, setScope] = useState("Monthly"); // 'Monthly' | 'Yearly'
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [product, setProduct] = useState(undefined);

  // --- Derived options
  const monthOptions = useMemo(() => {
    const options = [];
    const today = dayjs();
    const lastYear = dayjs().subtract(1, "year");
    let currentMonth = today;

    while (
      currentMonth.isAfter(lastYear) ||
      currentMonth.isSame(lastYear, "month")
    ) {
      options.push({
        value: currentMonth.format("YYYY-MM"),
        label: currentMonth.format("MMMM-YYYY"),
      });
      currentMonth = currentMonth.subtract(1, "month");
    }
    return options;
  }, []);

  const yearOptions = useMemo(() => {
    const options = [];
    const today = dayjs();
    const lastYear = dayjs().subtract(4, "year");
    let currentYear = today;

    while (
      currentYear.isAfter(lastYear) ||
      currentYear.isSame(lastYear, "year")
    ) {
      options.push({
        value: currentYear.format("YYYY"),
        label: currentYear.format("YYYY"),
      });
      currentYear = currentYear.subtract(1, "year");
    }
    return options;
  }, []);

  const productOptions = useMemo(() => {
    if (!Array.isArray(productDwl)) return [];
    return productDwl.map((p) => ({
      value: p.key,
      label: p.value,
    }));
  }, [productDwl]);

  // --- API callers
  const getCompareProductList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getCompareProduct(params);
        const data = response?.data || {};
        dispatch(setCompareProductList(data || []));
        setPagination((prev) => ({
          page: (data?.totalPages ?? 1) - 1,
          total: data?.totalItems ?? 0,
          size: prev.size,
        }));
      } catch (error) {
        console.error("Error fetching compare product list:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getActualVsPlanObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getActualVsPlan(params);
        dispatch(setActualVsPlanObj(response?.data || []));
      } catch (error) {
        console.error("Error fetching actual vs planned:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getWasteProductCompareObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getWasteProductCompare(params);
        dispatch(setWasteProductCompareObj(response?.data || []));
      } catch (error) {
        console.error("Error fetching waste product compare:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getProductDwl = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.getProductDwl();
      dispatch(setProductDwl(response?.data?.data || []));
    } catch (error) {
      console.error("Error fetching product list:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  const getOverviewObj = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.getOverviewObj();
      dispatch(setOverviewObj(response?.data || {}));
    } catch (error) {
      console.error("Error fetching overview:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  // --- Handlers (moved from PAGE)
  const handleChangeMonth = useCallback((value) => {
    setSelectedMonth(value);
  }, []);

  const handleChangeYear = useCallback((value) => {
    setSelectedYear(value);
  }, []);

  const handleChangeProduct = useCallback((value) => {
    setProduct(value);
  }, []);

  // --- Effects
  // 1) initial fetches
  useEffect(() => {
    getProductDwl();
    getOverviewObj();
  }, [getProductDwl, getOverviewObj]);

  // 2) default product once productDwl arrived
  useEffect(() => {
    if (!product && Array.isArray(productDwl) && productDwl.length > 0) {
      setProduct(productDwl[0].key);
    }
  }, [productDwl, product]);

  // 3) trigger APIs when any selection changes (scope/month/year/product)
  useEffect(() => {
    if (!product) return;
    const payload =
      scope === "Monthly"
        ? { scope, duration: selectedMonth, product }
        : { scope, duration: selectedYear, product };

    const apiParams = {
      pagination: { page: 0, size: 25 },
      param: payload,
    };

    getCompareProductList(apiParams);
    getActualVsPlanObj({ param: payload });
    getWasteProductCompareObj({ param: payload });
  }, [
    scope,
    selectedMonth,
    selectedYear,
    product,
    getCompareProductList,
    getActualVsPlanObj,
    getWasteProductCompareObj,
  ]);

  // 4) responsive table width with resize listener
  useEffect(() => {
    const onResize = () => setTableWidth(getResponsiveTableWidth());
    window.addEventListener("resize", onResize);
    // set initial in case SSR
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    // redux data
    compareProductList,
    actualVsPlanObj,
    wasteProductCompareObj,
    productDwl,
    overviewObj,
    isLoading,
    // local ui states
    pagination,
    filter,
    // selections & options
    scope,
    setScope,
    selectedMonth,
    selectedYear,
    product,
    monthOptions,
    yearOptions,
    productOptions,
    // handlers for UI components
    handleChangeMonth,
    handleChangeYear,
    handleChangeProduct,
    // layout
    tableWidth,
  };
}

export default useCompareDashboard;
