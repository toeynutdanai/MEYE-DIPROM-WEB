import React, { useMemo } from "react";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import {
  DownloadOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

const InterfaceLogTable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
  onChange = () => {},
  handleDownloadExcel = ()=>{}
}) => {

  const { t } = useTranslation();

  const columns = [
    {
      title: <div className="text-table">{t("system_log.label.log_date_time")}</div>,
      dataIndex: "dateTime",
      key: "dateTime",
      width: "20%",
    //   sorter: (a, b) => a.createDateTime.localeCompare(b.createDateTime),
      render: (_, record) => {
        return record.dateTime;
      },
    },
    {
      title: <div className="text-table">{t("system_log.label.file_name")}</div>,
      dataIndex: "fileName",
      key: "fileName",
      width: "20%",
    //   sorter: (a, b) => a.username.localeCompare(b.username),
      render: (_, record) => {
        return record.fileName;
      }
    },
    {
      title: <div className="text-table">{t("system_log.label.status")}</div>,
      dataIndex: "status",
      key: "status",
      width: "20%",
    //   sorter: (a, b) => a.username.localeCompare(b.username),
      render: (_, record) => {
        return record.status;
      }
    },
    {
      title: <div className="text-table">{t("system_log.label.action")}</div>,
      dataIndex: "logId",
      key: "logId",
      width: "20%",
      render: (_, record) => {
        // return record.activity;
        return <Button onClick={(e)=>handleDownloadExcel(record.logId,record.interfaceCode)}><DownloadOutlined style={{ fontSize: '20px',fontWeight: 'bold' }}/></Button>;
      },
      align: "center",
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

export default InterfaceLogTable;