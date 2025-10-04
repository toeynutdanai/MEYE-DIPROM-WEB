import { Table } from "antd";
import { useTranslation } from "react-i18next";

const SystemLogTable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
  scope = null,
  onChange = () => {},
}) => {
  const { t } = useTranslation();

  const columnsMonthly = [
    {
      title: <div className="text-table">Reference</div>,
      dataIndex: "reference",
      key: "reference",
      width: "5%",
      sorter: (a, b) => a.reference.localeCompare(b.reference),
      render: (_, record) => {
        return record.reference;
      }
    },
    {
      title: <div className="text-table">Plan Date</div>,
      dataIndex: "planDate",
      key: "planDate",
      width: "5%",
      sorter: (a, b) => a.planDate.localeCompare(b.planDate),
      render: (_, record) => {
        return record.planDate;
      }
    },
    {
      title: <div className="text-table">Plan Period</div>,
      dataIndex: "planPeriod",
      key: "planPeriod",
      width: "5%",
      sorter: (a, b) => a.planPeriod.localeCompare(b.planPeriod),
      render: (_, record) => {
        return record.planPeriod;
      },
    },
    {
      title: <div className="text-table">Plan Qty</div>,
      dataIndex: "planQty",
      key: "planQty",
      width: "5%",
      sorter: (a, b) => a.planQty.localeCompare(b.planQty),
      render: (_, record) => {
        return record.planQty;
      },
    },
    {
      title: <div className="text-table">Actual Period</div>,
      dataIndex: "actualPeriod",
      key: "actualPeriod",
      width: "5%",
      sorter: (a, b) => a.actualPeriod.localeCompare(b.actualPeriod),
      render: (_, record) => {
        return record.actualPeriod;
      },
    },
    {
      title: <div className="text-table">Actual Good Qty</div>,
      dataIndex: "actualGoodQty",
      key: "actualGoodQty",
      width: "5%",
      sorter: (a, b) => a.actualGoodQty.localeCompare(b.actualGoodQty),
      render: (_, record) => {
        return record.actualGoodQty;
      },
    },
    {
      title: <div className="text-table">Actual Waste Qty</div>,
      dataIndex: "actualWasteQty",
      key: "actualWasteQty",
      width: "5%",
      sorter: (a, b) => a.actualWasteQty.localeCompare(b.actualWasteQty),
      render: (_, record) => {
        return record.actualWasteQty;
      },
    },
    {
      title: <div className="text-table">Unit</div>,
      dataIndex: "unit",
      key: "unit",
      width: "5%",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
      render: (_, record) => {
        return record.unit;
      },
    },
    {
      title: <div className="text-table">Actual Machine Running Time (hr/day)</div>,
      dataIndex: "actualMachineRunningTime",
      key: "actualMachineRunningTime",
      width: "5%",
      sorter: (a, b) => a.actualMachineRunningTime.localeCompare(b.actualMachineRunningTime),
      render: (_, record) => {
        return record.actualMachineRunningTime;
      },
    },
  ];

  const columnsYearly = [
    {
      title: <div className="text-table">Plan Month</div>,
      dataIndex: "planMonth",
      key: "planMonth",
      width: "5%",
      sorter: (a, b) => a.planMonth.localeCompare(b.planMonth),
      render: (_, record) => {
        return record.planMonth;
      }
    },
    {
      title: <div className="text-table">Plan Qty</div>,
      dataIndex: "planQty",
      key: "planQty",
      width: "5%",
      sorter: (a, b) => a.planQty.localeCompare(b.planQty),
      render: (_, record) => {
        return record.planQty;
      },
    },
    {
      title: <div className="text-table">Total Actual Good Qty</div>,
      dataIndex: "totalActualGoodQty",
      key: "totalActualGoodQty",
      width: "5%",
      sorter: (a, b) => a.totalActualGoodQty.localeCompare(b.totalActualGoodQty),
      render: (_, record) => {
        return record.totalActualGoodQty;
      },
    },
    {
      title: <div className="text-table">Total Actual Waste Qty</div>,
      dataIndex: "totalActualWasteQty",
      key: "totalActualWasteQty",
      width: "5%",
      sorter: (a, b) => a.totalActualWasteQty.localeCompare(b.totalActualWasteQty),
      render: (_, record) => {
        return record.totalActualWasteQty;
      },
    },
    {
      title: <div className="text-table">Unit</div>,
      dataIndex: "unit",
      key: "unit",
      width: "5%",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
      render: (_, record) => {
        return record.unit;
      },
    },
    {
      title: <div className="text-table">Actual Machine Running Time (hr/day)</div>,
      dataIndex: "actualMachineRunningTime",
      key: "actualMachineRunningTime",
      width: "5%",
      sorter: (a, b) => a.actualMachineRunningTime.localeCompare(b.actualMachineRunningTime),
      render: (_, record) => {
        return record.actualMachineRunningTime;
      },
    },
  ];

  return (
    <Table
      columns={scope === "Monthly" ? columnsMonthly : columnsYearly}
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
