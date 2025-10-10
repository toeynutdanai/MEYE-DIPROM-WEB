import { EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../../features/userManagement/styles/UserManagement.module.css";

const UserManagementTable = ({
  onChange = () => {},
  onAction = () => {},
  isLoading = false,
  pagination = { current: 1, pageSize: 10, total: 0 },
  dataSource = [],
}) => {
  const { t } = useTranslation();
  const navigator = useNavigate();

  console.log(dataSource);

  const columns = [
    {
      title: <div className="text-table">Username</div>,
      dataIndex: "username",
      key: "username",
      // width: "20%",
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (_, record) => {
        return record.username;
      },
    },
    {
      title: <div className="text-table">Firstname</div>,
      dataIndex: "firstname",
      key: "firstname",
      // width: "20%",
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
      render: (_, record) => {
        return record.firstname;
      },
    },
    {
      title: <div className="text-table">Lastname</div>,
      dataIndex: "lastname",
      key: "lastname",
      //   width: "20%",
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
      render: (_, record) => {
        return record.lastname;
      },
    },
    {
      title: <div className="text-table">Role</div>,
      dataIndex: "role",
      key: "role",
      // width: "20%",
      sorter: (a, b) => a.role.localeCompare(b.role),
      render: (_, record) => {
        return record.role;
      },
    },
    {
      title: <div className="text-table">Company</div>,
      dataIndex: "company",
      key: "company",
      // width: "20%",
      sorter: (a, b) => a.company.localeCompare(b.company),
      render: (_, record) => {
        return record.company;
      },
    },
    {
      title: <div className="text-table">Status</div>,
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
      title: <div className="text-table">{t("action.action")}</div>,
      key: "action",
      width: "5%",
      fixed: "right",
      render: (_, record) => {
        if (isLoading) return "-";
        return (
          <Space size="middle">
            <Button icon={<EditOutlined />} color="#8c8c8c" onClick={onAction} />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={dataSource}
      pagination={{
        ...pagination,
        showTotal: (total, range) =>
          t("paginate.description")
            .replace("{min}", range[0])
            .replace("{max}", range[1])
            .replace("{total}", total),
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "25", "50", "100"],
      }}
      loading={isLoading}
      onChange={onChange}
      scroll={{ x: true }}
      className={styles.table}
      size="large"
    />
  );
};

export default UserManagementTable;
