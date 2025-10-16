import React, { useMemo } from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";

function CompareProductTable({
  isLoading = false,
  pagination = { page: 0, size: 25, total: 0 },
  dataSource = [],
  scope = null,
  onChange = () => {},
}) {
  const { t } = useTranslation();

  const columnsMonthly = useMemo(
    () => [
      {
        title: (
          <div className="text-table">
            {t("compare_dashboard.label.reference")}
          </div>
        ),
        dataIndex: "reference",
        key: "reference",
        width: "5%",
        sorter: false,
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
        sorter: false,
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
        sorter: false,
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
        sorter: false,
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
        sorter: false,
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
        sorter: false,
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
        sorter: false,
      },
      {
        title: (
          <div className="text-table">{t("compare_dashboard.label.unit")}</div>
        ),
        dataIndex: "unit",
        key: "unit",
        width: "5%",
        sorter: false,
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
        sorter: false,
      },
    ],
    [t]
  );

  const columnsYearly = useMemo(
    () => [
      {
        title: (
          <div className="text-table">
            {t("compare_dashboard.label.plan_month")}
          </div>
        ),
        dataIndex: "planMonth",
        key: "planMonth",
        width: "5%",
        sorter: false,
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
        sorter: false,
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
        sorter: false,
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
        sorter: false,
      },
      {
        title: (
          <div className="text-table">{t("compare_dashboard.label.unit")}</div>
        ),
        dataIndex: "unit",
        key: "unit",
        width: "5%",
        sorter: false,
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
        sorter: false,
      },
    ],
    [t]
  );

  const mappedPagination = useMemo(
    () => ({
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
    }),
    [pagination?.page, pagination?.size, pagination?.total, t]
  );

  return (
    <Table
      columns={scope === "Monthly" ? columnsMonthly : columnsYearly}
      dataSource={dataSource}
      pagination={mappedPagination}
      loading={isLoading}
      onChange={onChange}
      scroll={{ x: "max-content" }}
      bordered
      size="large"
    />
  );
}

export default React.memo(CompareProductTable);
