import { Modal } from "antd";
import alert from "components/elements/Alert";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "utils/helper";
import * as services from "../services/adminApi";
import { setIsLoading, setAdminList } from "../slices/adminSlice";
import session from "utils/session";
import { useNavigate } from "react-router-dom";

function toParams(params = {}) {
  const { pagination = {}, sortBy = [] } = params;
  return {
    pagination: {
      page: pagination.page,
      size: pagination.pageSize,
    },
    sortBy: sortBy
      .filter((s) => s.order !== undefined)
      .map((s) => ({
        direction: s.order === "descend" ? "desc" : "asc",
        property: s.field,
      })),
  };
}

function useUserManagement() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.admin.isLoading);
  const currentId = window.localStorage.getItem("id");
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [filter, setFilter] = useState({});
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [pageSize, setPageSize] = useState(15);

  const getAdminList = useCallback(
    async (params = {}) => {
      try {
        dispatch(setIsLoading(true));
        const response = await services.getAdminList({
          requestId: generateRandomString(),
          ...params.pagination,
          ...filter,
          sortBy: params.sortBy,
        });
        dispatch(setAdminList(response.data.content || []));
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
    [dispatch, filter, pagination.size]
  );

  const handleOnChange = useCallback(
    (tablePagination, tableSorter) => {
      setPagination(tablePagination);
      const modifiedSorter = Array.isArray(tableSorter)
        ? [...tableSorter]
        : [tableSorter];
      const modifiedParams = toParams({
        pagination: {
          page: tablePagination.current - 1,
          pageSize: tablePagination.pageSize,
        },
        sortBy: modifiedSorter,
        ...filter,
      });
      setPagination({
        page: tablePagination.current - 1,
        size: tablePagination.pageSize,
      });
      getAdminList(modifiedParams);
    },
    [filter, getAdminList]
  );

  const handleOnSubmit = useCallback(
    (values) => {
      setFilter(values);
    },
    [setFilter]
  );

  const handleOnAction = useCallback(
    () => {
      setOpenModal(true);
    },
    [setOpenModal]
  );

  const handleCloseAction = useCallback(
    () => {
      setOpenModal(false);
    },
    [setOpenModal]
  );

  const handleOnDelete = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: <p>{t("patient.message.delete")}</p>,
          async onOk() {
            const response = await services.deleteAdmin({
              requestId: generateRandomString(),
              userId: values,
            });
            alert({
              message: response.data.status.details[0].value || "Success",
            });
            if (currentId === values) {
              session.removeAuthToken();
              navigate("/sign_in");
            }
            getAdminList({
              pagination: { page: pagination.page, size: pagination.size },
            });
          },
          okText: t("common.confirm"),
          cancelText: t("common.cancel"),
        });
      } catch (error) {
        alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, getAdminList, pagination.page, pagination.size, t, currentId, navigate]
  );

  useEffect(() => {
    getAdminList({ pagination: { page: 0, size: 10 } });
  }, [getAdminList]);

  const data = useMemo(() => {
    const base = [
      {
        key: "1",
        username: "User0000",
        firstname: "Pakinut",
        lastname: "Thanantayakorn",
        role: "Super_Admin",
        company: "ABC Technology Co., Ltd.",
        status: "Active",
      },
      {
        key: "2",
        username: "User0001",
        firstname: "Pakinut",
        lastname: "Thanantayakorn",
        role: "Admin",
        company: "ABC Technology Co., Ltd.",
        status: "Active",
      },
      {
        key: "3",
        username: "User0002",
        firstname: "Pakinut",
        lastname: "Thanantayakorn",
        role: "User_A",
        company: "ABC Technology Co., Ltd.",
        status: "Active",
      },
      {
        key: "4",
        username: "User0003",
        firstname: "Pakinut",
        lastname: "Thanantayakorn",
        role: "User_B",
        company: "ABC Technology Co., Ltd.",
        status: "Active",
      },
      {
        key: "5",
        username: "User0004",
        firstname: "Pakinut",
        lastname: "Thanantayakorn",
        role: "Super_Admin",
        company: "ABC Technology Co., Ltd.",
        status: "Inactive",
      },
      {
        key: "6",
        username: "User0005",
        firstname: "Pakinut",
        lastname: "Thanantayakorn",
        role: "Super_Admin",
        company: "ABC Technology Co., Ltd.",
        status: "Inactive",
      },
    ];
    return Array.from({ length: 24 }, (_, i) => ({
      ...base[i % base.length],
      key: String(i + 1),
    }));
  }, []);

  const filtered = useMemo(() => {
    return data.filter((r) => {
      const hitSearch =
        !search ||
        [r.username, r.firstname, r.lastname, r.company, r.role].some((v) =>
          String(v).toLowerCase().includes(search.toLowerCase())
        );
      const hitRole = role === "ALL" || r.role === role;
      const hitStatus = status === "ALL" || r.status === status;
      return hitSearch && hitRole && hitStatus;
    });
  }, [data, search, role, status]);

  return {
    userManagementList: filtered,
    isLoading,
    pagination,
    filter,
    onChange: handleOnChange,
    onSubmit: handleOnSubmit,
    onClear: () => setFilter({}),
    onDelete: handleOnDelete,
    search,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
    openModal,
    onAction : handleOnAction,
    closeAction : handleCloseAction,
  };
}

export default useUserManagement;
