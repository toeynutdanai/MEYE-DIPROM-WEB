import React, { useMemo } from "react";
import { Dropdown, Space, Table } from "antd";
import { useTranslation } from "react-i18next";

const WarehourTrackingTable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
  onChange = () => {},
}) => {

  const { t } = useTranslation();

  const columns = [
    {
      title: <div className="text-table">{t("warehouse_and_order.label.product_name")}</div>,
      dataIndex: "productName",
      key: "productName",
      // width: "20%",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      render: (_, record) => {
        return record.productName;
      }
    },
    {
      title: <div className="text-table">{t("warehouse_and_order.label.unit")}</div>,
      dataIndex: "unit",
      key: "unit",
      // width: "20%",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
      render: (_, record) => {
        return record.unit;
      },
    },
    {
      title: <div className="text-table">{t("warehouse_and_order.label.stock_on_hand")}</div>,
      dataIndex: "stockOnHand",
      key: "stockOnHand",
      width: "20%",
      align: "right",
      sorter: (a, b) => a.stockOnHand.localeCompare(b.stockOnHand),
      render: (_, record) => {
        return record.stockOnHand;
      },
    },
    {
      title: <div className="text-table">{t("warehouse_and_order.label.upcoming_stock")}</div>,
      dataIndex: "upcomingStock",
      key: "upcomingStock",
      // width: "20%",
      align: "right",
      sorter: (a, b) => a.upcomingStock.localeCompare(b.upcomingStock),
      render: (_, record) => {
        return record.upcomingStock;
      },
    },
    {
      title: <div className="text-table">{t("warehouse_and_order.label.reserved_stock")}</div>,
      dataIndex: "reservedStock",
      key: "reservedStock",
      // width: "20%",
      align: "right",
      sorter: (a, b) => a.reservedStock.localeCompare(b.reservedStock),
      render: (_, record) => {
        return record.reservedStock;
      },
    },
    {
      title: <div className="text-table">{t("warehouse_and_order.label.available_stock")}</div>,
      dataIndex: "availableStock",
      key: "availableStock",
      // width: "20%",
      align: "right",
      sorter: (a, b) => a.availableStock.localeCompare(b.availableStock),
      render: (_, record) => {
        return record.availableStock;
      },
    },
    {
      title: <div className="text-table">{t("warehouse_and_order.label.status_stock")}</div>,
      dataIndex: "statusStock",
      key: "statusStock",
      // width: "20%",
      align: "center",
      sorter: (a, b) => a.statusStock.localeCompare(b.statusStock),
      render: (_, record) => {
        return (record.statusStock=='Available'?<label style={{color:'#008E11'}}>Available</label> : (record.statusStock=='Unavailable'?<label style={{color:'#F65778'}}>Unavailable</label> : <label style={{color:'#898989'}}>Out of Stock</label>));
      },
    },
    {
      title: <div className="text-table">{t("warehouse_and_order.label.queue_ahead")}</div>,
      dataIndex: "queueAhead",
      key: "queueAhead",
      // width: "20%",
      align: "right",
      sorter: (a, b) => a.queueAhead.localeCompare(b.queueAhead),
      render: (_, record) => {
        return record.queueAhead;
      },
    },
    {
      title: <div className="text-table">{t("warehouse_and_order.label.estimated_time_arrival")}</div>,
      dataIndex: "estimatedTimeArrival",
      key: "estimatedTimeArrival",
      // width: "20%",
      align: "center",
      sorter: (a, b) => a.estimatedTimeArrival.localeCompare(b.estimatedTimeArrival),
      render: (_, record) => {
        return record.estimatedTimeArrival;
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

export default WarehourTrackingTable;
