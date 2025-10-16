// hooks/useOEEDashboard.js (simplified: "load data straight")
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/oeeDashboardApi";
import {
  setIsLoading,
  setOEEList,
  setOEEObj,
  setOEEMachineObj,
  setFactorObj,
  setMachineDwl,
  setOEEByMachineList,
} from "../slices/oeeDashboardSlice";
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

export default function useOEEDashboard() {
  const dispatch = useDispatch();

  // store states
  const isLoading = useSelector((s) => s.oeeDashboard.isLoading);
  const oeeList = useSelector((s) => s.oeeDashboard.oeeList);
  const oeeObj = useSelector((s) => s.oeeDashboard.oeeObj);
  const oeeMachineObj = useSelector((s) => s.oeeDashboard.oeeMachineObj);
  const factorObj = useSelector((s) => s.oeeDashboard.factorObj);
  const machineDwl = useSelector((s) => s.oeeDashboard.machineDwl);
  const oeeByMachineList = useSelector((s) => s.oeeDashboard.oeeByMachineList);

  // local states
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());
  const [scope, setScope] = useState("Monthly"); // "Monthly" | "Yearly"
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [machine, setMachine] = useState(null); // { key, value }
  const [factor, setFactor] = useState("Availability");
  const [factorByMachine, setFactorByMachine] = useState("Availability");

  const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 }); // antd is 1-based

  // derived
  const duration = useMemo(
    () => (scope === "Monthly" ? selectedMonth : selectedYear),
    [scope, selectedMonth, selectedYear]
  );

  const monthOptions = useMemo(() => {
    const options = [];
    const today = dayjs();
    const lastYear = dayjs().subtract(1, "year");
    let cur = today;
    while (cur.isAfter(lastYear) || cur.isSame(lastYear, "month")) {
      options.push({ value: cur.format("YYYY-MM"), label: cur.format("MMMM-YYYY") });
      cur = cur.subtract(1, "month");
    }
    return options;
  }, []);

  const yearOptions = useMemo(() => {
    const options = [];
    const today = dayjs();
    const last = dayjs().subtract(4, "year");
    let cur = today;
    while (cur.isAfter(last) || cur.isSame(last, "year")) {
      options.push({ value: cur.format("YYYY"), label: cur.format("YYYY") });
      cur = cur.subtract(1, "year");
    }
    return options;
  }, []);

  const machineOptions = useMemo(
    () => (machineDwl ?? []).map((m) => ({ value: m.key, label: m.value })),
    [machineDwl]
  );

  const loadMachines = useCallback(async () => {
    try {
      const res = await services.getMachineDwl();
      dispatch(setMachineDwl(res?.data?.data ?? []));
      if (!machine && res?.data?.data.length > 0) {
        setMachine(res?.data?.data[0]);
      }
    } catch (e) {
      console.error("getMachineDwl error", e);
    }
  }, [dispatch, machine]);

  const fetchAll = useCallback(async () => {
    if (!machine?.key) return;
    dispatch(setIsLoading(true));
    try {
      const base = { scope, duration };

      // 0) list (with pagination 0-based for backend)
      const listPromise = services.getOEEList({
        ...base,
        page: Math.max(0, (pagination.current ?? 1) - 1),
        size: pagination.pageSize,
      });

      // 1) summary cards
      const oeeObjPromise = services.getOEEObj(base);
      const factorPromise = services.getFactorObj(base);

      // 2) machine-level
      const byMachinePromise = services.getOEEByMachineList(base);
      const machineObjPromise = services.getOEEMachineObj({ ...base, machineCode: machine.key });

      const [listRes, oeeRes, factorRes, byMachineRes, machineRes] = await Promise.all([
        listPromise,
        oeeObjPromise,
        factorPromise,
        byMachinePromise,
        machineObjPromise,
      ]);

      // update store
      const listData = listRes?.data?.data ?? {};
      dispatch(setOEEList(listData?.content || []));
      setPagination({
        current: (listData?.currentPage ?? 0) + 1, // backend -> antd (1-based)
        pageSize: listData?.pageSize,
        total: listData?.totalItems ?? 0
      });

      dispatch(setOEEObj(oeeRes?.data?.data || {}));
      dispatch(setFactorObj(factorRes?.data?.data || {}));
      dispatch(setOEEByMachineList(byMachineRes?.data?.data || []));
      dispatch(setOEEMachineObj(machineRes?.data?.data || {}));
    } catch (e) {
      console.error("fetchAll error", e);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, machine?.key, scope, duration, pagination.current, pagination.pageSize]);

  // effects
  useEffect(() => {
    loadMachines();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

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

  // handlers
  const handleChangeScope = useCallback((value) => {
    setScope(value);
  }, []);

  const handleChangeMonth = useCallback((value) => {
    setSelectedMonth(value);
    setPagination((p) => ({ ...p, current: 1 }));
  }, []);

  const handleChangeYear = useCallback((value) => {
    setSelectedYear(value);
    setPagination((p) => ({ ...p, current: 1 }));
  }, []);

  const handleChangeMachine = useCallback(
    async (machineKey) => {
      try {
        // หา object ของเครื่องเพื่อเอาไปแสดงชื่อ
        const found = (machineDwl ?? []).find((m) => m.key === machineKey);
        if (found) setMachine(found);

        const base = { scope, duration };

        dispatch(setIsLoading(true));
        const res = await services.getOEEMachineObj({
          ...base,
          machineCode: machineKey, // << ใช้ค่านี้เลย ไม่ใช่ value.key
        });
        dispatch(setOEEMachineObj(res?.data?.data ?? {}));
      } catch (e) {
        console.error("getOEEMachineObj error:", e);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, machineDwl, scope, duration]
  );

  const handleOnChange = useCallback(({ current, pageSize }) => {
    setPagination((p) => ({
      ...p,
      current: pageSize !== p.pageSize ? 1 : current, // reset to page 1 on size change
      pageSize,
    }));
  }, []);

  const handleDownloadExcel = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const res = await services.downloadOEEMachine({ scope, duration });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", `OEE_Machine_${dayjs().add(543, "year").format("DD_MM_YYYY")}.csv`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 0);
    } catch (e) {
      console.error("downloadOEEMachine error", e);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, scope, duration]);

  return {
    // store data
    isLoading,
    oeeList,
    oeeObj,
    oeeMachineObj,
    factorObj,
    machineDwl,
    oeeByMachineList,

    // ui
    tableWidth,
    pagination,

    // selections
    scope,
    selectedMonth,
    selectedYear,
    machine,
    factor,
    factorByMachine,

    setFactor,
    setFactorByMachine,

    // options
    monthOptions,
    yearOptions,
    machineOptions,

    // handlers
    handleChangeScope,
    handleChangeMonth,
    handleChangeYear,
    handleChangeMachine,
    handleOnChange,
    handleDownloadExcel,
    // handleDownloadExcel,
  };
}
