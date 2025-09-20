import { Dropdown, Space, Table } from "antd";
import alert from "components/elements/Alert";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SystemLogTable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
}) => {

  const { t } = useTranslation();

  const columns = [
    {
      title: <div className="text-table">{t("system_log.label.username")}</div>,
      dataIndex: "username",
      key: "username",
      width: "20%",
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (_, record) => {
        return record.username;
      }
    },
    {
      title: <div className="text-table">{t("system_log.label.login_date_time")}</div>,
      dataIndex: "loginDateTime",
      key: "loginDateTime",
      width: "20%",
      sorter: (a, b) => a.loginDateTime.localeCompare(b.loginDateTime),
      render: (_, record) => {
        return record.loginDateTime;
      },
    },
    {
      title: <div className="text-table">{t("system_log.label.logout_date_time")}</div>,
      dataIndex: "logoutDateTime",
      key: "logoutDateTime",
      width: "20%",
      sorter: (a, b) => a.logoutDateTime.localeCompare(b.logoutDateTime),
      render: (_, record) => {
        return record.logoutDateTime;
      },
    },
    {
      title: <div className="text-table">{t("system_log.label.ip_address")}</div>,
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: "20%",
      sorter: (a, b) => a.ipAddress.localeCompare(b.ipAddress),
      render: (_, record) => {
        return record.ipAddress;
      },
    },
    {
      title: <div className="text-table">{t("system_log.label.status_login")}</div>,
      dataIndex: "statusLogin",
      key: "statusLogin",
      width: "20%",
      sorter: (a, b) => a.statusLogin.localeCompare(b.statusLogin),
      render: (_, record) => {
        return record.statusLogin;
      },
    },
  ];

  return (
    <Table
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
    //   onChange={onChange}
      scroll={{ x: true }}
      bordered={true}
      size="large"
    />
  );
};

export default SystemLogTable;
