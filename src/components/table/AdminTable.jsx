import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Space, Table } from "antd";
import alert from "components/elements/Alert";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AdminTable = ({
  onChange = () => {},
  onDelete = () => {},
  isLoading = false,
  pagination = {},
  dataSource = [],
}) => {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const copyPhoneNumber = (phone) => {
    window.navigator.clipboard.writeText(phone);
  };

  const columns = [
    {
      title: <div className="text-table">{t("patient.label.email")}</div>,
      dataIndex: "email",
      key: "email",
      width: "35%",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (_, record) => (
        <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
          {record.email}
        </div>
      ),
    },
    {
      title: <div className="text-table">{t("patient.label.full_name")}</div>,
      dataIndex: "firstName",
      key: "firstName",
      width: "35%",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      render: (_, record) => {
        return record.firstName + " " + record.lastName;
      },
    },
    {
      title: <div className="text-table">{t("patient.label.phone")}</div>,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "20%",
      sorter: (a, b) => parseInt(a.phoneNumber) - parseInt(b.phoneNumber),
      render: (phoneNumber) => (
        <div
          onClick={() => {
            copyPhoneNumber(phoneNumber);
            alert({ message: "Copy phone number complete." });
          }}
          style={{
            cursor: "pointer",
            textAlign: "center",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {phoneNumber}
        </div>
      ),
    },
    {
      title: <div className="text-table">{t("action.action")}</div>,
      key: "action",
      width: "10%",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: t("action.edit"),
                  icon: (
                    <EditOutlined style={{ fontSize: "18px", color: "gray" }} />
                  ),
                  onClick: () =>
                    navigator(`/user_management/${record?.id}/edit`),
                },
                {
                  key: "2",
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
      ),
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

export default AdminTable;
