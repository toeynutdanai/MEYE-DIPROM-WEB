import { Table } from "antd";
import { useTranslation } from "react-i18next";

const OEETable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
  onChange = () => {},
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: (
        <div className="text-table">
          {t("oee_dashboard.label.machine_name")}
        </div>
      ),
      dataIndex: "machineName",
      key: "machineName",
      // width: "20%",
      sorter: (a, b) => a.machineName.localeCompare(b.machineName),
      render: (_, record) => {
        return record.machineName;
      },
    },
    {
      title: <div className="text-table">Period</div>,
      dataIndex: "period",
      key: "period",
      // width: "20%",
      sorter: (a, b) => a.period.localeCompare(b.period),
      render: (_, record) => {
        return record.period;
      },
    },
    {
      title: (
        <div className="text-table">{t("oee_dashboard.label.per_oee")}</div>
      ),
      dataIndex: "oeePercent",
      key: "oeePercent",
      // width: "20%",
      sorter: (a, b) => a.oeePercent.localeCompare(b.oeePercent),
      render: (_, record) => {
        return record.oeePercent;
      },
    },
    {
      title: (
        <div className="text-table">
          {t("oee_dashboard.label.per_availability")}
        </div>
      ),
      dataIndex: "availabilityPercent",
      key: "availabilityPercent",
      width: "20%",
      sorter: (a, b) =>
        a.availabilityPercent.localeCompare(b.availabilityPercent),
      render: (_, record) => {
        return record.availabilityPercent;
      },
    },
    {
      title: (
        <div className="text-table">
          {t("oee_dashboard.label.per_performance")}
        </div>
      ),
      dataIndex: "performancePercent",
      key: "performancePercent",
      // width: "20%",
      sorter: (a, b) =>
        a.performancePercent.localeCompare(b.performancePercent),
      render: (_, record) => {
        return record.performancePercent;
      },
    },
    {
      title: (
        <div className="text-table">{t("oee_dashboard.label.per_quality")}</div>
      ),
      dataIndex: "qualityPercent",
      key: "qualityPercent",
      // width: "20%",
      sorter: (a, b) => a.qualityPercent.localeCompare(b.qualityPercent),
      render: (_, record) => {
        return record.qualityPercent;
      },
    },
    {
      title: (
        <div className="text-table">
          {t("oee_dashboard.label.average_break_time")}
        </div>
      ),
      dataIndex: "averageBreakTime",
      key: "averageBreakTime",
      // width: "20%",
      sorter: (a, b) => a.averageBreakTime.localeCompare(b.averageBreakTime),
      render: (_, record) => {
        return record.averageBreakTime;
      },
    },
    {
      title: (
        <div className="text-table">
          {t("oee_dashboard.label.average_down_time")}
        </div>
      ),
      dataIndex: "averageDownTime",
      key: "averageDownTime",
      // width: "20%",
      sorter: (a, b) => a.averageDownTime.localeCompare(b.averageDownTime),
      render: (_, record) => {
        return record.averageDownTime;
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

export default OEETable;
