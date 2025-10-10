// UsersManagement.jsx
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select, Typography } from "antd";
import { MainLayout } from "components/layouts";
import UserManagementTable from "components/table/UserManagementTable";
import { useTranslation } from "react-i18next";
import styles from "../styles/UserManagement.module.css";
import ModalUser from "../../../components/elements/Modal/ModalUser";

export default function UsersManagement({
  userManagementList = [],
  isLoading = false,
  pagination,
  filter,
  onChange,
  onSubmit,
  onClear,
  onDelete,
  search = "",
  setSearch = () => {},
  role = "",
  setRole = () => {},
  status = "",
  setStatus = () => {},
  openModal = false,
  onAction = () => {},
  closeAction = () => {},
}) {
  // i18n
  const { t } = useTranslation();

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
              style={{ width: "100%" }}
              options={[
                { value: "ALL", label: "ALL" },
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
              style={{ width: "100%" }}
              options={[
                { value: "ALL", label: "ALL" },
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
          <Col
            xs={24}
            lg={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className={styles.btnPill}
              style={{ width: "150px" }}
            >
              New User
            </Button>
          </Col>
        </Row>

        {/* Table */}
        <UserManagementTable
          dataSource={userManagementList}
          isLoading={false}
          pagination={pagination}
          onChange={onChange}
          onAction={onAction}
        />
      </Card>

      <ModalUser
        isModalOpen={openModal}
        handleCancel={closeAction}
        onSubmit={{}}
      />
    </MainLayout>
  );
}
