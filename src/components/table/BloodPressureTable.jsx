import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Table } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BloodPressureTable = ({
  onChange = () => {},
  onDelete = () => {},
  isLoading = false,
  pagination = { current: 1, pageSize: 10, total: 0 },
  dataSource = [],
}) => {
  const { t } = useTranslation();
  const navigator = useNavigate();

  const columns = [
    {
      title: (
        <div className="text-table">
          {t("blood_pressure.label.blood_pressure_id")}
        </div>
      ),
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => {
        const currentPage = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;
        return (
          <div style={{ textAlign: "center" }}>
            {isLoading ? "-" : (currentPage - 1) * pageSize + index + 1}
          </div>
        );
      },
      width: "1%",
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.sys")}</div>,
      dataIndex: "systolicPressure",
      key: "systolicPressure",
      width: "10%",
      sorter: (a, b) =>
        parseInt(a.systolicPressure) - parseInt(b.systolicPressure),
      render: (text) => (
        <div style={{ textAlign: "center" }}>{isLoading ? "-" : text}</div>
      ),
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.dia")}</div>,
      dataIndex: "diastolicPressure",
      key: "diastolicPressure",
      width: "10%",
      sorter: (a, b) =>
        parseInt(a.diastolicPressure) - parseInt(b.diastolicPressure),
      render: (text) => (
        <div style={{ textAlign: "center" }}>{isLoading ? "-" : text}</div>
      ),
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.pul")}</div>,
      dataIndex: "pulseRate",
      key: "pulseRate",
      width: "10%",
      sorter: (a, b) => parseInt(a.pulseRate) - parseInt(b.pulseRate),
      render: (text) => (
        <div style={{ textAlign: "center" }}>{isLoading ? "-" : text}</div>
      ),
    },
    {
      title: (
        <div className="text-table">{t("blood_pressure.label.patient")}</div>
      ),
      dataIndex: "patient",
      key: "patient",
      width: "20%",
      render: (_, record) =>
        isLoading
          ? "-"
          : record.patient?.firstName + " " + record.patient?.lastName,
    },
    {
      title: (
        <div className="text-table">{t("blood_pressure.label.updateBy")}</div>
      ),
      dataIndex: "updateBy",
      key: "updateBy",
      width: "25%",
      render: (_, record) =>
        isLoading
          ? "-"
          : !record.updateBy?.firstName
          ? record.createBy?.firstName + " " + record.createBy?.lastName
          : record.updateBy?.firstName + " " + record.updateBy?.lastName,
    },
    {
      title: (
        <div className="text-table">{t("blood_pressure.label.updateDate")}</div>
      ),
      dataIndex: "updateDate",
      key: "updateDate",
      width: "20%",
      sorter: (a, b) =>
        moment(a?.updateDate ? a?.updateDate : a?.createDate) -
        moment(b?.updateDate ? b?.updateDate : b?.createDate),
      render: (_, record) => {
        if (isLoading) return "-";
        const formattedDate = moment
          .utc(record.updateDate ? record.updateDate : record.createDate)
          .utcOffset("+0700")
          .add(543, "years")
          .format("HH:mm:ss - DD/MM/YYYY");
        return <div style={{ textAlign: "center" }}>{formattedDate}</div>;
      },
    },
    {
      title: <div className="text-table">{t("action.action")}</div>,
      key: "action",
      width: "5%",
      fixed: "right",
      render: (_, record) => {
        if (isLoading) return "-";
        return (
          <Space size="middle">
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: t("action.view"),
                    icon: (
                      <EyeOutlined
                        style={{ fontSize: "18px", color: "gray" }}
                      />
                    ),
                    onClick: () =>
                      navigator(`/patient/${record?.createBy?.id}`),
                  },
                  {
                    key: "2",
                    label: t("action.edit"),
                    icon: (
                      <EditOutlined
                        style={{ fontSize: "18px", color: "gray" }}
                      />
                    ),
                    onClick: () =>
                      navigator(`/blood_pressure/${record?.id}/edit`),
                  },
                  {
                    key: "3",
                    label: t("action.delete"),
                    icon: (
                      <DeleteOutlined
                        style={{ fontSize: "18px", color: "gray" }}
                      />
                    ),
                    onClick: () => onDelete(record?.id),
                  },
                ],
              }}
            >
              <MoreOutlined style={{ fontSize: "25px", color: "gray" }} />
            </Dropdown>
          </Space>
        );
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

export default BloodPressureTable;
