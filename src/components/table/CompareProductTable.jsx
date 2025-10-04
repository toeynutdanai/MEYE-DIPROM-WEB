import { Table } from "antd";
import { useTranslation } from "react-i18next";

const SystemLogTable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
  onChange = () => {},
}) => {

  const { t } = useTranslation();

  const columns = [
    {
      title: <div className="text-table">{t("compare_dashboard.label.production_date")}</div>,
      dataIndex: "productionDate",
      key: "productionDate",
      width: "20%",
      sorter: (a, b) => a.productionDate.localeCompare(b.productionDate),
      render: (_, record) => {
        return record.productionDate;
      }
    },
    {
      title: <div className="text-table">{t("compare_dashboard.label.per_production")}</div>,
      dataIndex: "perProduction",
      key: "perProduction",
      width: "20%",
      sorter: (a, b) => a.perProduction.localeCompare(b.perProduction),
      render: (_, record) => {
        return record.perProduction;
      },
    },
    {
      title: <div className="text-table">{t("compare_dashboard.label.per_time_utilization")}</div>,
      dataIndex: "perTimeUtilization",
      key: "perTimeUtilization",
      width: "20%",
      sorter: (a, b) => a.perTimeUtilization.localeCompare(b.perTimeUtilization),
      render: (_, record) => {
        return record.perTimeUtilization;
      },
    },
    {
      title: <div className="text-table">{t("compare_dashboard.label.actual_production")}</div>,
      dataIndex: "actualProduction",
      key: "actualProduction",
      width: "20%",
      sorter: (a, b) => a.actualProduction.localeCompare(b.actualProduction),
      render: (_, record) => {
        return record.actualProduction;
      },
    },
    {
      title: <div className="text-table">{t("compare_dashboard.label.actual_machine_running_time")}</div>,
      dataIndex: "actualMachineRunningTime",
      key: "actualMachineRunningTime",
      width: "20%",
      sorter: (a, b) => a.actualMachineRunningTime.localeCompare(b.actualMachineRunningTime),
      render: (_, record) => {
        return record.actualMachineRunningTime;
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
      onChange={onChange}
      scroll={{ x: true }}
      bordered={true}
      size="large"
    />
  );
};

export default SystemLogTable;
