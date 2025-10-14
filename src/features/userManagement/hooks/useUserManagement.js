// features/userManagement/hooks/useUserManagement.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../services/userManagementApi";
import { setIsLoading, setUserManagementList, setRoles } from "../slices/userManagementSlice";
import { generateRandomString } from "utils/helper";
import { type } from "@testing-library/user-event/dist/type";

const isBlank = (v) => v == null || String(v).trim() === "";

function useUserManagement() {
  const dispatch = useDispatch();
  const isLoading = useSelector((s) => s.userManagement.isLoading);
  const userManagementList = useSelector((s) => s.userManagement.userManagementList);
  const rolesList = useSelector((s) => s.userManagement.roles);

  const [statusModal, setStatusModal] = useState(false);
  const [record, setRecord] = useState({});
  const [uiSearch, setUiSearch] = useState("");
  const [uiRole, setUiRole] = useState("ALL");
  const [uiStatus, setUiStatus] = useState("ALL");
  const [qSearch, setQSearch] = useState("");
  const [qRole, setQRole] = useState("ALL");
  const [qStatus, setQStatus] = useState("ALL");

  // antd pagination (1-based)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const rolesOptions = useMemo(() => {
    return (rolesList ?? []).map((p) => ({ value: p.key, label: p.value }));
  }, [rolesList]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setIsLoading(true));
        const res = await services.getRoles();
        const data = res?.data?.data ?? [];
        dispatch(setRoles(Array.isArray(data) ? data : []));
      } catch (e) {
        console.error("Error fetching roles:", e);
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [dispatch]);

  // ---------- fetch (ยิงเฉพาะเมื่อ pagination หรือ "applied query" เปลี่ยน) ----------
  const fetchList = useCallback(async () => {
    dispatch(setIsLoading(true));
    try {
      const payload = {
        requestId: generateRandomString(),
        page: pagination.current - 1,
        size: pagination.pageSize,
        ...(!isBlank(qSearch) ? { search: qSearch.trim() } : {}),
        ...(qRole && qRole !== "ALL" ? { role: qRole } : {}),
        ...(qStatus && qStatus !== "ALL" ? { status: qStatus } : {}),
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
  }, [dispatch, pagination.current, pagination.pageSize, qSearch, qRole, qStatus]);

  const userManagement = useCallback(async (params) => {
    try {
      dispatch(setIsLoading(true));
      const res = await services.userManagement({ roles: [params.role], ...params });
    } catch (err) {
      console.error("addUserManagement error:", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleOnChange = useCallback((tablePagination) => {
    const current = tablePagination?.current ?? 1;
    const pageSize = tablePagination?.pageSize ?? 10;
    setPagination((prev) => ({ ...prev, current, pageSize }));
  }, []);

  const handleAddUser = async (values, { setSubmitting, resetForm }) => {
    try {
      await userManagement({ type: "New", ...values });
      closeAction();
    } catch (e) {
      console.error("create user error:", e);
    } finally {
      setSubmitting(false);
      await fetchList();
    }
  };

  const handleEditUser = async (values, { setSubmitting, resetForm }) => {
    try {
      await userManagement({
        type: "Update",
        firstname: values.firstname,
        lastname: values.lastname,
        role: values.role,
        status: values.status,
      });
      closeAction();
    } catch (e) {
      console.error("create user error:", e);
    } finally {
      setSubmitting(false);
      await fetchList();
    }
  };

  const handleSubmit = useCallback(() => {
    setPagination((p) => ({ ...p, current: 1 }));
    setQSearch(uiSearch ?? "");
    setQRole(uiRole ?? "ALL");
    setQStatus(uiStatus ?? "ALL");
  }, [uiSearch, uiRole, uiStatus]);

  const handleClear = useCallback(() => {
    setUiSearch("");
    setUiRole("ALL");
    setUiStatus("ALL");

    setPagination((p) => ({ ...p, current: 1 }));
    setQSearch("");
    setQRole("ALL");
    setQStatus("ALL");
  }, []);

  const handleEdit = (record) => {
    setRecord(record); // เก็บค่าทั้งแถว
    setOpenModal(true);
    setStatusModal(true);
  };

  const [openModal, setOpenModal] = useState(false);
  const onAction = useCallback(() => setOpenModal(true), []);
  const closeAction = useCallback(() => setOpenModal(false), []);

  return {
    // data
    userManagementList,
    isLoading,
    record,

    // table
    pagination,
    onChange: handleOnChange,

    search: uiSearch, setSearch: setUiSearch,
    role: uiRole, setRole: setUiRole,
    status: uiStatus, setStatus: setUiStatus,
    rolesOptions,

    // actions
    onSubmit: handleSubmit,
    onClear: handleClear,
    onEdit: handleEdit,

    onSubmitModal: statusModal ? handleEditUser : handleAddUser,
    // modal
    openModal, onAction, closeAction,

    statusModal,
    setStatusModal,
  };
}

export default useUserManagement;
