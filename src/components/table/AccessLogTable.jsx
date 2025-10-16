import React, { useMemo } from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";

const AccessLogTable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
  onChange = () => {},
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

  // map pagination (0-based API -> AntD 1-based UI)
    const mappedPagination = useMemo(() => ({
      current: (pagination?.page ?? 0) + 1,
      pageSize: pagination?.size ?? 25,
      total: pagination?.total ?? 0,
      showSizeChanger: true,
      pageSizeOptions: ["10", "25", "50", "100"],
      showTotal: (total, range) =>
        t("paginate.description")
          .replace("{min}", String(range[0]))
          .replace("{max}", String(range[1]))
          .replace("{total}", String(total)),
    }), [pagination?.page, pagination?.size, pagination?.total, t]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={mappedPagination}
      loading={isLoading}
      onChange={onChange}
      scroll={{ x: true }}
      bordered={true}
      size="large"
    />
  );
};

export default AccessLogTable;
