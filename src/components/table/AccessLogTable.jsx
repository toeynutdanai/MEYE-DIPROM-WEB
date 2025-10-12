import { Table } from "antd";
import { useTranslation } from "react-i18next";

const AccessLogTable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
}) => {

  const { t } = useTranslation();

  const columns = [
    {
      title: <div className="text-table">{t("system_log.label.log_date_time")}</div>,
      dataIndex: "createDateTime",
      key: "createDateTime",
      width: "20%",
    //   sorter: (a, b) => a.createDateTime.localeCompare(b.createDateTime),
      render: (_, record) => {
        return record.createDateTime;
      },
    },
    {
      title: <div className="text-table">{t("system_log.label.username")}</div>,
      dataIndex: "username",
      key: "username",
      width: "20%",
    //   sorter: (a, b) => a.username.localeCompare(b.username),
      render: (_, record) => {
        return record.username;
      }
    },
    {
      title: <div className="text-table">{t("system_log.label.action")}</div>,
      dataIndex: "activity",
      key: "activity",
      width: "20%",
    //   sorter: (a, b) => a.activity.localeCompare(b.activity),
      render: (_, record) => {
        return record.activity;
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
        pageSizeOptions: ["10", "25", "50", "100"],
      }}
      loading={isLoading}
    //   onChange={onChange}
      scroll={{ x: true }}
      bordered={true}
      size="large"
    />
  );
};

export default AccessLogTable;
