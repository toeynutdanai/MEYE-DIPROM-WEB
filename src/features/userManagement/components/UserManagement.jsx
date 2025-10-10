// UsersManagement.jsx
import {
  PlusOutlined,
  SafetyOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { MainLayout } from "components/layouts";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/UserManagement.module.css";
const ALL = "ALL";

export default function UsersManagement() {
  // i18n
  const { t } = useTranslation();

  // filters
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // mock data (แทนด้วย data จริงได้)
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
      const hitRole = role === ALL || r.role === role;
      const hitStatus = status === ALL || r.status === status;
      return hitSearch && hitRole && hitStatus;
    });
  }, [data, search, role, status]);

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Firstname", dataIndex: "firstname", key: "firstname" },
    { title: "Lastname", dataIndex: "lastname", key: "lastname" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Company", dataIndex: "company", key: "company" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) => (
        <Tag className={s === "Active" ? styles.tagActive : styles.tagInactive}>
          {s}
        </Tag>
      ),
      width: 130,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size={8}>
          <Button type="link" className={styles.linkBtn}>
            Company Detail
          </Button>
          <Button type="link" className={styles.linkBtn}>
            Role Detail
          </Button>
          <Button type="link" className={styles.linkBtn}>
            System Log
          </Button>
        </Space>
      ),
      width: 260,
    },
  ];

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, filtered.length);

  return (
    <MainLayout
      title={t("user_management.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("authorize.header") },
        { title: t("user_management.header") },
      ]}
    >
      <Card className={styles.card} bodyStyle={{ padding: 24 }}>
        <Row justify="space-between" align="middle">
          <Typography.Title level={4} className={styles.titleDim}>
            Users Management
          </Typography.Title>
          <Space>
            <Button icon={<SafetyOutlined />}>Authorize</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              New User
            </Button>
          </Space>
        </Row>

        {/* Filters row (search + role + status + search button) */}
        <Row gutter={[12, 12]} align="middle" className={styles.filtersRow}>
          <Col xs={24} lg={6}>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="large"
              suffix={<SearchOutlined />}
              className={styles.searchPill}
              allowClear
            />
          </Col>
          <Col xs={12} lg={1}>
            <div className={styles.fieldLabel}>Role</div>
          </Col>
          <Col xs={12} lg={4}>
            <Select
              value={role}
              onChange={setRole}
              size="large"
              className={styles.selectPill}
              style={{ width: '100%' }}
              options={[
                { value: ALL, label: "ALL" },
                { value: "Super_Admin", label: "Super_Admin" },
                { value: "Admin", label: "Admin" },
                { value: "User_A", label: "User_A" },
                { value: "User_B", label: "User_B" },
              ]}
            />
          </Col>
          <Col xs={12} lg={1}>
            <div className={styles.fieldLabel}>Status</div>
          </Col>
          <Col xs={12} lg={4}>
            <Select
              value={status}
              onChange={setStatus}
              size="large"
              className={styles.selectPill}
              style={{ width: '100%' }}
              options={[
                { value: ALL, label: "ALL" },
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />
          </Col>
          <Col xs={24} lg={2}>
            <Button type="primary" className={styles.btnPill}>
              Search
            </Button>
          </Col>
        </Row>

        {/* Table */}
        <Table
          rowKey="key"
          columns={columns}
          dataSource={filtered.slice((page - 1) * pageSize, page * pageSize)}
          pagination={{
            current: page,
            pageSize,
            total: filtered.length,
            showSizeChanger: true,
            pageSizeOptions: [15, 25, 50, 100],
            onChange: (p, ps) => {
              setPage(p);
              setPageSize(ps);
            },
            showLessItems: true,
          }}
          className={styles.table}
          size="middle"
        />
      </Card>
    </MainLayout>
  );
}
