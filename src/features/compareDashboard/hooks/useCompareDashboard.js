// hooks/useCompareDashboard.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/compareDashboardApi";
import {
  setIsLoading,
  setCompareProductList,
  setProductList,
  setActualVsPlanObj,
  setWasteProductCompareObj,
  setOverviewObj,
} from "../slices/compareDashboardSlice";
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

function useCompareDashboard() {
  const dispatch = useDispatch();

  // Redux states
  const isLoading = useSelector((s) => s.compareDashboard.isLoading);
  const productList = useSelector((s) => s.compareDashboard.productList);
  const compareProductList = useSelector((s) => s.compareDashboard.compareProductList);
  const actualVsPlanObj = useSelector((s) => s.compareDashboard.actualVsPlanObj);
  const wasteProductCompareObj = useSelector((s) => s.compareDashboard.wasteProductCompareObj);
  const overviewObj = useSelector((s) => s.compareDashboard.overviewObj);

  // Local UI states
  const [pagination, setPagination] = useState({ current: 1, pageSize: 15, total: 0 });
  const [filter, setFilter] = useState({});
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());

  const [scope, setScope] = useState("Monthly"); // 'Monthly' | 'Yearly'
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selectedProducts, setSelectedProducts] = useState([]);

  // ----- Options (pure)
  const monthOptions = useMemo(() => {
    const options = [];
    const today = dayjs();
    const lastYear = dayjs().subtract(1, "year");
    let currentMonth = today;
    while (currentMonth.isAfter(lastYear) || currentMonth.isSame(lastYear, "month")) {
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
    while (currentYear.isAfter(lastYear) || currentYear.isSame(lastYear, "year")) {
      options.push({
        value: currentYear.format("YYYY"),
        label: currentYear.format("YYYY"),
      });
      currentYear = currentYear.subtract(1, "year");
    }
    return options;
  }, []);

  const productOptions = useMemo(() => {
    return (productList ?? []).map((p) => ({
      value: p.key,
      label: p.value,
    }));
  }, [productList]);

  // ----- Fetchers
  const getProducts = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const res = await services.getProduct();
      const data = res?.data?.data ?? [];
      dispatch(setProductList(Array.isArray(data) ? data : []));
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        const code = first.key;
        setSelectedProducts([code]);
      }
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  const getCompare = useCallback(
    async ({ scope, duration, productCodes }) => {
      try {
        dispatch(setIsLoading(true));
        console.log(scope,
          duration,
          productCodes,);
        const res = await services.getCompareProduct({
          scope: scope,
          duration: duration,
          productCode: productCodes,
          page: pagination.current -1,
          size: pagination.pageSize,
        });
        const data = res?.data?.data ?? {};
        console.log("getCompare",data)
        dispatch(setCompareProductList(data?.content ?? data ?? []));
        setPagination(() => ({
          current: data?.currentPage,
          total: data?.totalItems ?? (Array.isArray(data?.items) ? data.items.length : 0),
          pageSize: data?.pageSize,
        }));
      } catch (e) {
        console.error("Error fetching compare product list:", e);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getActualVsPlan = useCallback(
    async ({ scope, duration, productCodes }) => {
      try {
        dispatch(setIsLoading(true));
        const res = await services.getActualVsPlan({
          scope: scope,
          duration: duration,
          productCode: productCodes
        });
        dispatch(setActualVsPlanObj(res?.data?.data ?? {}));
      } catch (e) {
        console.error("Error fetching actual vs planned:", e);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getWasteCompare = useCallback(
    async ({ scope, duration, productCodes }) => {
      try {
        dispatch(setIsLoading(true));
        const res = await services.getWasteProductCompare({
          scope: scope,
          duration: duration,
          productCode: productCodes
        });
        dispatch(setWasteProductCompareObj(res?.data?.data ?? {}));
      } catch (e) {
        console.error("Error fetching waste product compare:", e);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getOverview = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const res = await services.getOverviewObj();
      dispatch(setOverviewObj(res?.data ?? {}));
    } catch (e) {
      console.error("Error fetching overview:", e);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  const handleDownloadExcel = async () => {
    try {
      dispatch(setIsLoading(true));
      const duration = scope === "Monthly" ? selectedMonth : selectedYear;
      const response = await services.downloadCompareProduct({
        scope,
        duration,
        productCode: selectedProducts[0]
      });

      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        "CompareProduct_" + moment().add(543, "years").format("DD_MM_YYYY") + ".csv"
      );
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };


  // ----- Handlers
  const handleChangeMonth = useCallback((value) => setSelectedMonth(value), []);
  const handleChangeYear = useCallback((value) => setSelectedYear(value), []);
  const handleChangeProduct = useCallback((values) => {
    // values: array ของ code จาก Select (mode="multiple") หรือ string ถ้า single
    setSelectedProducts(Array.isArray(values) ? values : [values]);
  }, []);

  // ----- Effects
  // โหลด product list + overview ครั้งแรก
  useEffect(() => {
    getProducts();
    getOverview();
  }, [getProducts, getOverview]);

  // ยิง API เมื่อ selection เปลี่ยน
  useEffect(() => {
    if (!selectedProducts || selectedProducts.length === 0) return;
    const duration = scope === "Monthly" ? selectedMonth : selectedYear;
    const args = { scope, duration, productCodes: selectedProducts[0] };

    getCompare(args);
    getActualVsPlan(args);
    getWasteCompare(args);
  }, [
    scope,
    selectedMonth,
    selectedYear,
    selectedProducts,
    getCompare,
    getActualVsPlan,
    getWasteCompare,
  ]);

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
    // redux data
    compareProductList,
    actualVsPlanObj,
    wasteProductCompareObj,
    overviewObj,
    isLoading,

    // local ui states
    pagination,
    filter,

    // selections & options
    scope,
    selectedMonth,
    selectedYear,
    selectedProducts,
    monthOptions,
    yearOptions,
    productOptions,

    // handlers
    setScope,
    handleChangeMonth,
    handleChangeYear,
    handleChangeProduct,
    handleDownloadExcel,

    // layout
    tableWidth,
  };
}

export default useCompareDashboard;
