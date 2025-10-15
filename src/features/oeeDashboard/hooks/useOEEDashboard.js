import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/oeeDashboardApi";
import {
  setIsLoading,
  setOEEList,
  setOEEObj,
  setOEEMachineObj,
  setFactorObj,
  setMachineDwl,
  setOverviewObj,
  setOEEByMachineList,
} from "../slices/oeeDashboardSlice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/en";
import moment from "moment";
import { generateRandomString } from "utils/helper";
dayjs.extend(customParseFormat);
dayjs.locale("en");

// util เดิมจากคอมโพเนนต์
function getResponsiveTableWidth() {
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

function useOEEDashboard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.oeeDashboard.isLoading);
  const oeeList = useSelector((state) => state.oeeDashboard.oeeList);
  const oeeObj = useSelector((state) => state.oeeDashboard.oeeObj);
  const oeeMachineObj = useSelector((state) => state.oeeDashboard.oeeMachineObj);
  const factorObj = useSelector((state) => state.oeeDashboard.factorObj);
  const machineDwl = useSelector((state) => state.oeeDashboard.machineDwl);
  const overviewObj = useSelector((state) => state.oeeDashboard.overviewObj);
  const oeeByMachineList = useSelector((state) => state.oeeDashboard.oeeByMachineList);

  // moved from component
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  // const [duration,setduration ]= scope === "Monthly" ? selectedMonth : selectedYear;
  const [machine, setMachine] = useState({});
  const [factor, setFactor] = useState("Availability");
  const [factorByMachine, setFactorByMachine] = useState("Availability");
  const [scope, setScope] = useState("Monthly");

  const [pagination, setPagination] = useState({ current: 1, pageSize: 15, total: 0 });
  const [filter] = useState({});

  // ------- services fetchers (เดิมใน hook) -------
  const getMachineDwl = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.getMachineDwl();
      dispatch(setMachineDwl(response.data.data || []));
    } catch (error) {
      console.error("Error fetching MachineDwl:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  const getOverviewObj = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.getOverviewObj();
      dispatch(setOverviewObj(response.data || {}));
    } catch (error) {
      console.error("Error fetching Overview:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  const getOEEList = useCallback(
    async (params = {}) => {
      try {
        const payload = {
        requestId: generateRandomString(),
        scope: scope ?? "",
        duration: params.duration ?? "",
        // role: role === "ALL" ? "" : role,
        // status: status === "ALL" ? "" : status,
        page: pagination.current -1,
        size: pagination.pageSize,
      };
        dispatch(setIsLoading(true));
        const response = await services.getOEEList(payload);
        dispatch(setOEEList(response?.data?.data?.content || []));
        setPagination(() => ({
          current: response.data?.data?.currentPage,
          total: response.data?.data?.totalItems ?? 0,
          pageSize: pagination.pageSize,
        }));
      } catch (error) {
        console.error("Error fetching OEEList:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getOEEObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getOEEObj(params);
        dispatch(setOEEObj(response?.data?.data || {}));
      } catch (error) {
        console.error("Error fetching OEEObj:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getOEEMachineObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getOEEMachineObj(params);
        dispatch(setOEEMachineObj(response?.data?.data || {}));
      } catch (error) {
        console.error("Error fetching OEEMachineObj:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getFactorObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getFactorObj(params);
        dispatch(setFactorObj(response?.data?.data || {}));
      } catch (error) {
        console.error("Error fetching FactorObj:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getOEEByMachineList = useCallback(async (params = {}) => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.getOEEByMachineList(params);
      dispatch(setOEEByMachineList(response?.data?.data || []));
      setPagination((prev) => ({
        page: (response.data?.totalPages ?? 1) - 1,
        total: response.data?.totalItems ?? 0,
        size: prev.size,
      }));
    } catch (error) {
      console.error("Error fetching OEEByMachineList:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  // ------- orchestrator (เดิมเป็น props.onChange ใน component) -------
  const handleOnChange = useCallback((values) => {
    getOEEList({
      pagination: { page: values.current, size: values.pageSize },
      scope: values.scope,
      duration: values.duration,
    });
    getOEEObj({
      scope: values.scope,
      duration: values.duration,
    });
    getFactorObj({
      scope: values.scope,
      duration: values.duration,
      factor: values.factor,
    });
    getOEEByMachineList({
      scope: values.scope,
      duration: values.duration,
    });
    getOEEMachineObj({
      scope: values.scope,
      duration: values.duration,
      machineCode: values.machine,
    });
  }, [getOEEMachineObj, getOEEList, getOEEObj, getFactorObj, getOEEByMachineList]);

  // ------- effects ที่ย้ายมาจาก component -------
  useEffect(() => {
    const onResize = () => setTableWidth(getResponsiveTableWidth());
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ตั้งค่าเริ่มต้น machine เมื่อโหลด dropdown เสร็จ
  useEffect(() => {
    if (Array.isArray(machineDwl) && machineDwl.length > 0) {
      const defaultMachine = machineDwl[0];
      setMachine(defaultMachine);
      const duration = scope === "Monthly" ? selectedMonth : selectedYear;
      handleOnChange({
        pagination,
        scope,
        duration,
        machine: defaultMachine.key,
        drillDown: false,
        factor,
      });
    }
  }, [machineDwl, scope, selectedMonth, selectedYear, factor, handleOnChange]);

  // เมื่อ scope/month/year เปลี่ยน -> fetch ชุดรวม (ไม่ drill-down)
  useEffect(() => {
    if (!machine?.key) return;
    const duration = scope === "Monthly" ? selectedMonth : selectedYear;
    handleOnChange({
      pagination,
      scope,
      duration,
      machine: machine.key,
      drillDown: false,
      factor,
    });
  }, [scope, selectedMonth, selectedYear, machine?.key, factor, handleOnChange]);

  // เมื่อ machine เปลี่ยน -> fetch drill-down
  useEffect(() => {
    if (!machine?.key) return;
    const duration = scope === "Monthly" ? selectedMonth : selectedYear;
    handleOnChange({
      pagination,
      scope,
      duration,
      machine: machine.key,
      drillDown: true,
      factor,
    });
  }, [machine?.key, scope, selectedMonth, selectedYear, factor, handleOnChange]);

  // preload ค่ารวม
  useEffect(() => {
    getMachineDwl();
    getOverviewObj();
  }, [getMachineDwl, getOverviewObj]);

  // ------- options & handlers (เดิมใน component) -------
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

  const machineOptions = useMemo(
    () =>
      (machineDwl || []).map((m) => ({
        value: m.key,
        label: m.value,
      })),
    [machineDwl]
  );

  const handleChangeMonth = useCallback((value) => {
    setSelectedMonth(value);
  }, []);
  const handleChangeYear = useCallback((value) => {
    setSelectedYear(value);
  }, []);
  const handleChangeMachine = useCallback(
    (value) => {
      const found = (machineDwl || []).find((m) => m.key === value);
      if (found) setMachine(found);
    },
    [machineDwl]
  );

  const handleDownloadExcel = async () => {
      try {
        dispatch(setIsLoading(true));
        const duration = scope === "Monthly" ? selectedMonth : selectedYear;
        const response = await services.downloadOEEMachine({
          scope,
          duration
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
  
        link.setAttribute(
          "download",
          "OEE_Machine_" + moment().add(543, "years").format("DD_MM_YYYY") + ".csv"
        );
        document.body.appendChild(link);
        link.click();
  
        link.parentNode.removeChild(link);
      } catch (error) {
      } finally {
        dispatch(setIsLoading(false));
      }
    };

  // expose ให้คอมโพเนนต์ใช้
  return {
    // data from store
    oeeList,
    oeeObj,
    oeeMachineObj,
    oeeByMachineList,
    machineDwl,
    overviewObj,
    isLoading,

    // pagination/filter (เดิมใน hook)
    pagination,

    // presentational states moved from component
    tableWidth,
    scope,
    setScope,
    selectedMonth,
    selectedYear,
    handleChangeMonth,
    handleChangeYear,

    factor,
    setFactor,
    factorObj,

    factorByMachine,
    setFactorByMachine,

    machine,
    handleChangeMachine,
    handleDownloadExcel,

    // options
    monthOptions,
    yearOptions,
    machineOptions,

    // orchestrator (ถ้าคอมโพเนนต์อื่นอยากเรียกเอง)
    onChange: handleOnChange,
    t,
  };
}

export default useOEEDashboard;
