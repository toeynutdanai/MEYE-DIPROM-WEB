import { Dropdown, Space, Table } from "antd";
import alert from "components/elements/Alert";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const OEETable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
  onChange = () => {},
}) => {

  const { t } = useTranslation();

  const columns = [
    {
      title: <div className="text-table">{t("oee_dashboard.label.machine_name")}</div>,
      dataIndex: "machineName",
      key: "machineName",
      // width: "20%",
      sorter: (a, b) => a.machineName.localeCompare(b.machineName),
      render: (_, record) => {
        return record.machineName;
      }
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.per_oee")}</div>,
      dataIndex: "perOEE",
      key: "perOEE",
      // width: "20%",
      sorter: (a, b) => a.perOEE.localeCompare(b.perOEE),
      render: (_, record) => {
        return record.perOEE;
      },
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.per_availability")}</div>,
      dataIndex: "perAvailability",
      key: "perAvailability",
      width: "20%",
      sorter: (a, b) => a.perAvailability.localeCompare(b.perAvailability),
      render: (_, record) => {
        return record.perAvailability;
      },
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.per_performance")}</div>,
      dataIndex: "perPerformance",
      key: "perPerformance",
      // width: "20%",
      sorter: (a, b) => a.perPerformance.localeCompare(b.perPerformance),
      render: (_, record) => {
        return record.perPerformance;
      },
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.per_quality")}</div>,
      dataIndex: "perQuality",
      key: "perQuality",
      // width: "20%",
      sorter: (a, b) => a.perQuality.localeCompare(b.perQuality),
      render: (_, record) => {
        return record.perQuality;
      },
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.average_break_time")}</div>,
      dataIndex: "averageBreakTime",
      key: "averageBreakTime",
      // width: "20%",
      sorter: (a, b) => a.averageBreakTime.localeCompare(b.averageBreakTime),
      render: (_, record) => {
        return record.averageBreakTime;
      },
    },
    {
      title: <div className="text-table">{t("oee_dashboard.label.average_down_time")}</div>,
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
