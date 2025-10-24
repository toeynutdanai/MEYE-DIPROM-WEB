// components/table/UserManagementTable.jsx
import { EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import { useTranslation } from "react-i18next";
import styles from "../../features/userManagement/styles/UserManagement.module.css";

const UserManagementTable = ({
  onChange = () => {},
  onEdit = () => {},
  isLoading = false,
  pagination = { current: 1, pageSize: 10, total: 0 },
  dataSource = [],
}) => {
  const { t } = useTranslation();

  const columns = [
    { title: <div className="text-table">Username</div>, dataIndex: "username", key: "username", sorter: false },
    { title: <div className="text-table">Firstname</div>, dataIndex: "firstName", key: "firstName", sorter: false },
    { title: <div className="text-table">Lastname</div>, dataIndex: "lastName", key: "lastName", sorter: false },
    { title: <div className="text-table">Role</div>, dataIndex: "roleNames", key: "roleNames", sorter: false },
    {
      title: <div className="text-table">Status</div>,
      dataIndex: "status",
      key: "status",
      render: (s) => (
        <Tag className={s === "ACTIVE" ? styles.tagActive : styles.tagInactive}>
          {s}
        </Tag>
      ),
      width: 130,
      align: "center",
      sorter: false,
    },
    {
      title: <div className="text-table">{t("action.action")}</div>,
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {onEdit(record)}} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(r) => r.userId ?? r.username}  // ใช้คีย์ที่เสถียร
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      onChange={onChange}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ["10", "25", "50", "100"],
        showTotal: (total, range) =>
          t("paginate.description")
            .replace("{min}", String(range[0]))
            .replace("{max}", String(range[1]))
            .replace("{total}", String(total)),
      }}
      scroll={{ x: true }}
      className={styles.table}
      size="large"
    />
  );
};

export default UserManagementTable;
