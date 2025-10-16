// hooks/useCompareDashboard.js (simplified: "load data straight")
import { useCallback, useEffect, useMemo, useState } from "react";
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

dayjs.extend(customParseFormat);
dayjs.locale("en");

function getResponsiveTableWidth() {
  if (typeof window === "undefined") return "100%";
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

export default function useCompareDashboard() {
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

  const productCode = useMemo(() => {
    if (Array.isArray(selectedProducts) && selectedProducts.length > 0) {
      return selectedProducts[0];
    }
    return undefined;
  }, [selectedProducts]);

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

  const productOptions = useMemo(
    () => (productList ?? []).map((p) => ({ value: p.key, label: p.value })),
    [productList]
  );

  // ----- Fetchers (simple, direct)
  const getProducts = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const res = await services.getProduct();
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      dispatch(setProductList(data));

      // auto-select first product once
      if (data.length > 0 && (!Array.isArray(selectedProducts) || selectedProducts.length === 0)) {
        setSelectedProducts([data[0].key]);
      }
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, selectedProducts]);

  const fetchAll = useCallback(async () => {
    if (!productCode) return; // wait until product is available

    try {
      dispatch(setIsLoading(true));

      // 1) Compare list (updates table + pagination)
      const compareRes = await services.getCompareProduct({
        scope,
        duration,
        productCode,
        page: pagination.page,
        size: pagination.size,
      });
      const compareData = compareRes?.data?.data ?? {};
      dispatch(setCompareProductList(compareData?.content || []));
      setPagination((prev) => ({
        ...prev,
        page: compareData?.currentPage ?? prev.page ?? 0,
        size: compareData?.pageSize ?? prev.size ?? 25,
        total: compareData?.totalItems ?? prev.total ?? 0,
      }));

      // 2) Actual vs Plan (straight)
      const avpRes = await services.getActualVsPlan({ scope, duration, productCode });
      dispatch(setActualVsPlanObj(avpRes?.data?.data ?? {}));

      // 3) Waste compare (straight)
      const wasteRes = await services.getWasteProductCompare({ scope, duration, productCode });
      dispatch(setWasteProductCompareObj(wasteRes?.data?.data ?? {}));
    } catch (e) {
      console.error("fetchAll error:", e);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, productCode, scope, duration, pagination.page, pagination.size]);

  const handleDownloadExcel = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.downloadCompareProduct({ scope, duration, productCode });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `CompareProduct_${dayjs().add(543, "year").format("DD_MM_YYYY")}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 0);
    } catch (e) {
      console.error("downloadCompareProduct error:", e);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, scope, duration, productCode]);

  // ----- Handlers
  const handleOnChange = useCallback((tablePagination) => {
    const current = tablePagination?.current ?? 1;
    const nextSize = tablePagination?.pageSize ?? 25;
    const sizeChanged = nextSize !== pagination.size;

    setPagination((prev) => ({
      page: sizeChanged ? 0 : Math.max(0, current - 1),
      size: nextSize,
      total: prev.total ?? 0,
    }));
  }, [pagination.size]);

  const handleChangeMonth = useCallback((value) => {
    setSelectedMonth(value);
    setPagination((prev) => ({ ...prev, page: 0 }));
  }, []);

  const handleChangeYear = useCallback((value) => {
    setSelectedYear(value);
    setPagination((prev) => ({ ...prev, page: 0 }));
  }, []);

  const handleChangeProduct = useCallback((values) => {
    const arr = Array.isArray(values) ? values : [values];
    setSelectedProducts(arr);
    setPagination((prev) => ({ ...prev, page: 0 }));
  }, []);

  // ----- Effects (simple)
  // 1) Load product list on mount
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Fetch EVERYTHING directly whenever selection or pagination changes
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // 3) Responsive width (throttled by RAF)
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
