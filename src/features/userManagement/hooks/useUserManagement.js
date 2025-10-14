// features/userManagement/hooks/useUserManagement.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/userManagementApi";
import { setIsLoading, setUserManagementList } from "../slices/userManagementSlice";
import { generateRandomString } from "utils/helper";

function useUserManagement() {
  const dispatch = useDispatch();
  const isLoading = useSelector((s) => s.userManagement.isLoading);
  const userManagementList = useSelector((s) => s.userManagement.userManagementList);

  // filters
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const getUserManagementList = useCallback(async () => {
    dispatch(setIsLoading(true));
    try {
      const payload = {
        requestId: generateRandomString(),
        // search: search ?? "",
        // role: role === "ALL" ? "" : role,
        // status: status === "ALL" ? "" : status,
        page: pagination.current -1,
        size: pagination.pageSize,
      };

      const res = await services.getUserManagementList(payload);
      const data = res?.data?.data || {};
      const rows = data.content || [];
      const total = Number(data.totalItems || 0);

      dispatch(setUserManagementList(rows));
      setPagination((p) => ({ ...p, total }));
    } catch (err) {
      console.error("getUserManagementList error:", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, search, role, status, pagination.current, pagination.pageSize]);

  const handleOnChange = useCallback((tablePagination, _filters) => {
    const current = tablePagination?.current ?? 1;
    const pageSize = tablePagination?.pageSize ?? 10;

    setPagination((prev) => ({ ...prev, current, pageSize }));
  }, []);

  useEffect(() => {
    getUserManagementList();
  }, [pagination.current, pagination.pageSize, getUserManagementList]);

  const handleSubmit = useCallback(() => {
    setPagination((p) => ({ ...p, current: 1 }));
  }, []);

  // modal create/edit
  const [openModal, setOpenModal] = useState(false);
  const onAction = useCallback(() => setOpenModal(true), []);
  const closeAction = useCallback(() => setOpenModal(false), []);

  return {
    // data
    userManagementList,
    isLoading,
    // table
    pagination,
    onChange: handleOnChange,

    // filters
    search, setSearch,
    role, setRole,
    status, setStatus,
    onSubmit: handleSubmit,

    // modal
    openModal, onAction, closeAction,
  };
}

export default useUserManagement;
