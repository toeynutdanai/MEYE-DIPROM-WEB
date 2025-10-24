// features/userManagement/pages/UsersManagement.jsx
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select, Typography } from "antd";
import { MainLayout } from "components/layouts";
import { useTranslation } from "react-i18next";
import styles from "../styles/UserManagement.module.css";
import ModalUser from "components/elements/Modal/ModalUser";
import UserManagementTable from "components/table/UserManagementTable";

export default function UsersManagement({
  userManagementList,
  record,
  isLoading,
  pagination,
  onChange,

  search,
  setSearch,
  role,
  rolesOptions,
  setRole,
  status,
  setStatus,
  onSubmit,
  onSubmitModal,
  onEdit,

  openModal,
  onAction,
  closeAction,
  handleResetClick,

  statusModal,
  setStatusModal,
}) {
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
          <h3>Users Management</h3>
        </Row>

        {/* Filters */}
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
              options={[{ value: "ALL", label: "ALL" }, ...rolesOptions]}
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
                { value: "ACTIVE", label: "Active" },
                { value: "INACTIVE", label: "Inactive" },
              ]}
            />
          </Col>

          <Col xs={24} lg={2}>
            <Button
              type="primary"
              className={styles.btnPill}
              onClick={onSubmit}
            >
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
              style={{ width: 150 }}
              onClick={onAction}
            >
              New User
            </Button>
          </Col>
        </Row>

        {/* Table */}
        <UserManagementTable
          dataSource={userManagementList}
          isLoading={isLoading}
          pagination={pagination}
          onChange={onChange}
          onEdit={onEdit}
        />
      </Card>

      {/* Modal */}
      <ModalUser
        isModalOpen={openModal}
        handleCancel={closeAction}
        handleResetClick={handleResetClick}
        onSubmit={onSubmitModal}
        roleOptions={rolesOptions}
        data={record}
        statusModal={statusModal}
      />
    </MainLayout>
  );
}
