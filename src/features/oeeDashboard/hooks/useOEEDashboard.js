import { useCallback, useEffect, useState } from "react";
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
  setOEEByMachineList
} from "../slices/oeeDashboardSlice";

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

  const [pagination, setPagination] = useState({ page: 0, size: 25 });
  const [filter, setFilter] = useState({});

  const getMachineDwl = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getMachineDwl();
        dispatch(setMachineDwl(response.data.data || []));

      } catch (error) {
        console.error("Error fetching MachineDwl:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [setMachineDwl]
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

  const getOEEList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getOEEList(params);
        dispatch(setOEEList(response.data || []));
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
    [dispatch, filter, pagination.size]
  );

  const getOEEObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getOEEObj(params);
        dispatch(setOEEObj(response.data || {}));
      } catch (error) {
        console.error("Error fetching OEEObj:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter]
  );

  const getOEEMachineObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getOEEMachineObj(params);
        dispatch(setOEEMachineObj(response.data || {}));
      } catch (error) {
        console.error("Error fetching OEEMachineObj:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter]
  );

  const getFactorObj = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getFactorObj(params);
        dispatch(setFactorObj(response.data || {}));
      } catch (error) {
        console.error("Error fetching FactorObj:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, filter]
  );

  const getOEEByMachineList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getOEEByMachineList(params);
        dispatch(setOEEByMachineList(response.data || []));
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
    []
  );


  const handleOnChange = useCallback((values) => {
    if (values.drillDown) {
      getOEEMachineObj({ param: values });
    } else {
      getOEEList({ pagination: { page: 0, size: 25 }, param: values });
      getOEEObj({ param: values });
      getFactorObj({ param: values });
      getOEEByMachineList({ param: values });
      getOEEMachineObj({ param: values });
    }

  }, []
  );

  useEffect(() => {
    getMachineDwl();
    getOverviewObj();
  }, [getMachineDwl, getOverviewObj]);

  return {
    oeeList,
    oeeObj,
    oeeMachineObj,
    factorObj,
    oeeByMachineList,
    machineDwl,
    overviewObj,
    isLoading,
    pagination,
    filter,
    onChange: handleOnChange,
  };
}

export default useOEEDashboard;
