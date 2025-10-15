// hooks/useCompareDashboard.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/compareDashboardApi";
import {
  setIsLoading,
  setCompareProductList,
  setProductList,
  setActualVsPlanObj,
  setWasteProductCompareObj,
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

  // Local UI states
  const [pagination, setPagination] = useState({ page: 0, size: 25, total: 0 });
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());

  const [scope, setScope] = useState("Monthly"); // 'Monthly' | 'Yearly'
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selectedProducts, setSelectedProducts] = useState([]);

  // ----- Derived selections
  const duration = useMemo(
    () => (scope === "Monthly" ? selectedMonth : selectedYear),
    [scope, selectedMonth, selectedYear]
  );

  const productCode = useMemo(
    () => (Array.isArray(selectedProducts) && selectedProducts.length > 0 ? selectedProducts[0] : undefined),
    [selectedProducts]
  );

  // keep last in-flight token to avoid race conditions (axios cancel token-like flag)
  const inFlightRef = useRef({ token: 0 });

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
      const list = Array.isArray(data) ? data : [];
      dispatch(setProductList(list));
      // auto select first product if nothing selected
      if (list.length > 0 && (!Array.isArray(selectedProducts) || selectedProducts.length === 0)) {
        const first = list[0];
        const code = first.key;
        setSelectedProducts([code]);
      }
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, selectedProducts]);

  const fetchCompare = useCallback(
    async (localToken) => {
      try {
        dispatch(setCompareProductList([]));
        const response = await services.getCompareProduct({
          scope,
          duration,
          productCode,
          page: pagination.page,
          size: pagination.size,
        });

        // ignore stale response
        if (inFlightRef.current.token !== localToken) return;

        dispatch(setCompareProductList(response?.data?.data?.content || []));
        setPagination((prev) => ({
          ...prev,
          page: response.data?.data?.currentPage ?? prev.page ?? 0,
          size: response.data?.data?.pageSize ?? prev.size ?? 25,
          total: response.data?.data?.totalItems ?? prev.total ?? 0,
        }));
      } catch (e) {
        if (inFlightRef.current.token === localToken) {
          console.error("Error fetching compare product list:", e);
          // keep old compare list on error
        }
      }
    },
    [dispatch, scope, duration, productCode, pagination.page, pagination.size]
  );

  const fetchActualVsPlan = useCallback(
    async (localToken) => {
      try {
        const res = await services.getActualVsPlan({
          scope,
          duration,
          productCode,
        });

        if (inFlightRef.current.token !== localToken) return;

        dispatch(setActualVsPlanObj(res?.data?.data ?? {}));
      } catch (e) {
        if (inFlightRef.current.token === localToken) {
          console.error("Error fetching actual vs planned:", e);
        }
      }
    },
    [dispatch, scope, duration, productCode]
  );

  const fetchWasteCompare = useCallback(
    async (localToken) => {
      try {
        const res = await services.getWasteProductCompare({
          scope,
          duration,
          productCode,
        });

        if (inFlightRef.current.token !== localToken) return;

        dispatch(setWasteProductCompareObj(res?.data?.data ?? {}));
      } catch (e) {
        if (inFlightRef.current.token === localToken) {
          console.error("Error fetching waste product compare:", e);
        }
      }
    },
    [dispatch, scope, duration, productCode]
  );

  // Shoot ALL APIs when selection (scope/duration/product) changes
  const fetchAllOnSelection = useCallback(async () => {
    if (!productCode) return; // wait until product is available
    const localToken = Date.now();
    inFlightRef.current.token = localToken;

    try {
      dispatch(setIsLoading(true));
      await Promise.all([
        fetchCompare(localToken),
        fetchActualVsPlan(localToken),
        fetchWasteCompare(localToken),
      ]);
    } finally {
      // ensure this completion still belongs to the latest token
      if (inFlightRef.current.token === localToken) {
        dispatch(setIsLoading(false));
      }
    }
  }, [dispatch, productCode, fetchCompare, fetchActualVsPlan, fetchWasteCompare]);

  // Only Compare when pagination changes (avoid re-calling other APIs)
  const fetchOnlyCompareOnPageChange = useCallback(async () => {
    if (!productCode) return;
    const localToken = Date.now();
    inFlightRef.current.token = localToken;

    try {
      dispatch(setIsLoading(true));
      await fetchCompare(localToken);
    } finally {
      if (inFlightRef.current.token === localToken) {
        dispatch(setIsLoading(false));
      }
    }
  }, [dispatch, productCode, fetchCompare]);

  const handleDownloadExcel = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.downloadCompareProduct({
        scope,
        duration,
        productCode,
      });

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
      // revoke later for Safari compatibility
      setTimeout(() => window.URL.revokeObjectURL(url), 0);
    } catch (error) {
      console.error("downloadCompareProduct error:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, scope, duration, productCode]);

  // ----- Handlers
  const handleOnChange = useCallback((tablePagination) => {
    const current = tablePagination?.current ?? 1;
    const changeSize = pagination.size !== tablePagination?.pageSize;
    const size = tablePagination?.pageSize ?? 25;
    setPagination((prev) => ({ page: changeSize ? 0 : current - 1, size, total: prev.total ?? 0 }));
  }, []);

  const handleChangeMonth = useCallback((value) =>{
    setSelectedMonth(value);
    setPagination((prev) => ({ ...prev, page: 0 }));
  } , []);
  const handleChangeYear = useCallback((value) => {
    setSelectedYear(value);
    setPagination((prev) => ({ ...prev, page: 0 }));
  }, []);
  const handleChangeProduct = useCallback((values) => {
    const arr = Array.isArray(values) ? values : [values];
    setSelectedProducts(arr);
    // reset pagination when product changes (UX expectation)
    setPagination((prev) => ({ ...prev, page: 0 }));
  }, []);

  // ----- Effects
  // โหลด product list ครั้งแรก
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // ยิง API ทั้งชุดเมื่อ selection (scope/duration/product) เปลี่ยน
  useEffect(() => {
    fetchAllOnSelection();
  }, [fetchAllOnSelection, scope, duration, productCode]);

  // ยิงเฉพาะ compare เมื่อ page/size เปลี่ยน
  useEffect(() => {
    fetchOnlyCompareOnPageChange();
  }, [fetchOnlyCompareOnPageChange, pagination.page, pagination.size]);

  // responsive width (rAF throttle)
  useEffect(() => {
    let frame = null;
    const onResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setTableWidth(getResponsiveTableWidth());
        frame = null;
      });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
      onResize();
      return () => {
        window.removeEventListener("resize", onResize);
        if (frame) cancelAnimationFrame(frame);
      };
    }
  }, []);

  return {
    // redux data
    compareProductList,
    actualVsPlanObj,
    wasteProductCompareObj,
    isLoading,

    // local ui states
    pagination,

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
    onChange: handleOnChange,

    // layout
    tableWidth,
  };
}

export default useCompareDashboard;
