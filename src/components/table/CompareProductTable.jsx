import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { cmp, fieldCmp } from "../../utils/helper/sorters";

function CompareProductTable({
  isLoading = false,
  pagination = {},
  dataSource = [],
  scope = null,
  onChange = () => {},
}) {
  const { t } = useTranslation();

  console.log("dataSource",dataSource)
  const columnsMonthly = [
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.reference")}
        </div>
      ),
      dataIndex: "reference",
      key: "reference",
      width: "5%",
      sorter: fieldCmp("reference"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.plan_date")}
        </div>
      ),
      dataIndex: "planDate",
      key: "planDate",
      width: "5%",
      sorter: fieldCmp("planDate"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.plan_period")}
        </div>
      ),
      dataIndex: "planPeriod",
      key: "planPeriod",
      width: "5%",
      sorter: fieldCmp("planPeriod"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.plan_qty")}
        </div>
      ),
      dataIndex: "planQty",
      key: "planQty",
      width: "5%",
      sorter: fieldCmp("planQty"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.actual_period")}
        </div>
      ),
      dataIndex: "actualPeriod",
      key: "actualPeriod",
      width: "5%",
      sorter: fieldCmp("actualPeriod"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.actual_good_qty")}
        </div>
      ),
      dataIndex: "actualGoodQty",
      key: "actualGoodQty",
      width: "5%",
      sorter: fieldCmp("actualGoodQty"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.actual_waste_qty")}
        </div>
      ),
      dataIndex: "actualWasteQty",
      key: "actualWasteQty",
      width: "5%",
      sorter: fieldCmp("actualWasteQty"),
    },
    {
      title: (
        <div className="text-table">{t("compare_dashboard.label.unit")}</div>
      ),
      dataIndex: "unit",
      key: "unit",
      width: "5%",
      sorter: fieldCmp("unit"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.actual_machine_running_time")}
        </div>
      ),
      dataIndex: "actualMachineRunningTime",
      key: "actualMachineRunningTime",
      width: "5%",
      sorter: fieldCmp("actualMachineRunningTime"),
    },
  ];

  const columnsYearly = [
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.plan_month")}
        </div>
      ),
      dataIndex: "planMonth",
      key: "planMonth",
      width: "5%",
      sorter: fieldCmp("planMonth"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.plan_qty")}
        </div>
      ),
      dataIndex: "planQty",
      key: "planQty",
      width: "5%",
      sorter: fieldCmp("planQty"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.total_actual_good_qty")}
        </div>
      ),
      dataIndex: "totalActualGoodQty",
      key: "totalActualGoodQty",
      width: "5%",
      sorter: fieldCmp("totalActualGoodQty"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.total_actual_waste_qty")}
        </div>
      ),
      dataIndex: "totalActualWasteQty",
      key: "totalActualWasteQty",
      width: "5%",
      sorter: fieldCmp("totalActualWasteQty"),
    },
    {
      title: (
        <div className="text-table">{t("compare_dashboard.label.unit")}</div>
      ),
      dataIndex: "unit",
      key: "unit",
      width: "5%",
      sorter: fieldCmp("unit"),
    },
    {
      title: (
        <div className="text-table">
          {t("compare_dashboard.label.actual_machine_running_time")}
        </div>
      ),
      dataIndex: "actualMachineRunningTime",
      key: "actualMachineRunningTime",
      width: "5%",
      sorter: fieldCmp("actualMachineRunningTime"),
    },
  ];

  return (
    <Table
      key={scope}
      columns={scope === "Monthly" ? columnsMonthly : columnsYearly}
      dataSource={dataSource}
      pagination={{
        ...pagination,
        showTotal: (total, range) =>
          t("paginate.description")
            .replace("{min}", String(range[0]))
            .replace("{max}", String(range[1]))
            .replace("{total}", String(total)),
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        pageSizeOptions: ["10", "25", "50", "100"],
      }}
      loading={isLoading}
      onChange={onChange}
      scroll={{ x: true }}
      bordered
      size="large"
      // rowKey={(r) =>
      //   r.key ??
      //   `${r.reference ?? r.planMonth ?? "row"}-${r.planDate ?? ""}-${r.planPeriod ?? ""}`
      // }
    />
  );
}

export default CompareProductTable;
