import { Table } from "antd";
import { useTranslation } from "react-i18next";

const OEETable = ({
  isLoading = false,
  pagination = { current: 1, pageSize: 25, total: 0 },
  dataSource = [],
  onChange = () => {},
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: <div className="text-table">{t("oee_dashboard.label.machine_name")}</div>,
      dataIndex: "machineName",
      key: "machineName",
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.period")}</div>,
      dataIndex: "period",
      key: "period",
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.per_oee")}</div>,
      dataIndex: "oeePercent",
      key: "oeePercent",
      align: "right",
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.per_availability")}</div>,
      dataIndex: "availabilityPercent",
      key: "availabilityPercent",
      width: "20%",
      align: "right",
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.per_performance")}</div>,
      dataIndex: "performancePercent",
      key: "performancePercent",
      align: "right",
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.per_quality")}</div>,
      dataIndex: "qualityPercent",
      key: "qualityPercent",
      align: "right",
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.average_break_time")}</div>,
      dataIndex: "averageBreakTime",
      key: "averageBreakTime",
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.average_down_time")}</div>,
      dataIndex: "averageDownTime",
      key: "averageDownTime",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        current: pagination?.current ?? 1,
        pageSize: pagination?.pageSize ?? 25,
        total: pagination?.total ?? 0,
        showSizeChanger: true,
        pageSizeOptions: ["10", "25", "50", "100"],
        showTotal: (total, range) =>
          t("paginate.description")
            .replace("{min}", String(range[0]))
            .replace("{max}", String(range[1]))
            .replace("{total}", String(total)),
      }}
      loading={isLoading}
      onChange={onChange}              // (pagination) => ...
      scroll={{ x: "max-content" }}
      bordered={true}
      size="large"
      rowKey={(row) => row.id || row.key || `${row.machineName}-${row.period}`}
    />
  );
};

export default OEETable;
