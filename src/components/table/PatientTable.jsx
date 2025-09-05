import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Checkbox, Dropdown, Space, Table } from "antd";
import alert from "components/elements/Alert";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PatientTable = ({
  onChange = () => {},
  onDelete = () => {},
  onCheckboxChange = () => {},
  isLoading = false,
  pagination = {},
  dataSource = [],
}) => {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const copyPhoneNumber = (phone) => {
    window.navigator.clipboard.writeText(phone);
  };

  const getColorForWord = (word) => {
    switch (word) {
      case "OPTIMAL":
        return "#34A853";
      case "NORMAL":
        return "#71C02B";
      case "HIGH":
        return "#ffea47";
      case "GRADE1":
        return "#ff9747";
      case "GRADE2":
        return "#ff7247";
      case "GRADE3":
        return "#ff4747";
      case "ISOLATED":
        return "#af47ff";
      default:
        return "#000000";
    }
  };

  const columns = [
    {
      title: <div className="text-table">{t("patient.label.hn")}</div>,
      dataIndex: "hospitalNumber",
      key: "hospitalNumber",
      width: "8%",
      sorter: (a, b) => parseInt(a.hospitalNumber) - parseInt(b.hospitalNumber),
      render: (_, record) => (
        <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
          {record.hospitalNumber}
        </div>
      ),
    },
    {
      title: <div className="text-table">{t("patient.label.email")}</div>,
      dataIndex: "email",
      key: "email",
      width: "13%",
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
      width: "13%",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      render: (_, record) => {
        return record.firstName + " " + record.lastName ;
      },
    },
    {
      title: <div className="text-table">{t("patient.label.age")}</div>,
      dataIndex: "age",
      key: "age",
      width: window.localStorage.getItem("lang") === 'th' ? "5%" : "10%",
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => {
        return window.localStorage.getItem("lang") === 'th' ? record.age + ' ปี' : record.age +  ' years old'
      },
    },{
      title: <div className="text-table">{t("patient.label.gender")}</div>,
      dataIndex: "gender",
      key: "gender",
      width: "5%",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      render: (_, record) => {
        return window.localStorage.getItem("lang") === 'en' ? record.gender : record.gender === 'male' ? 'ชาย' : 'หญิง'
      },
    },
    {
      title: <div className="text-table">{t("patient.label.phone")}</div>,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "8%",
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
      title: <div className="text-table">{t("patient.label.status")}</div>,
      dataIndex: "statusFlag",
      key: "statusFlag",
      width: "5%",
      sorter: (a, b) => a.statusFlag.localeCompare(b.statusFlag),
      render: (status) => (
        <div
          style={{
            backgroundColor: status === "ACTIVE" ? "#71C02B" : "#FFC107",
            padding: "6px",
            borderRadius: "5px",
            width: "fit-content",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {status}
        </div>
      ),
    },
    {
      title: <div className="text-table">{t("patient.label.level")}</div>,
      dataIndex: "level",
      key: "level",
      width: "1%",
      sorter: (a, b) => a.level.localeCompare(b.level),
      render: (level) => (
        <div
          style={{
            backgroundColor: getColorForWord(level),
            padding: "6px",
            borderRadius: "5px",
            width: "fit-content",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {level}
        </div>
      ),
    },
    {
      title: <div className="text-table">{t("patient.label.checkState")}</div>,
      dataIndex: "verified",
      key: "verified",
      width: "1%",
      sorter: (a, b) => a.verified - b.verified,
      align: "center",
      render: (verified, record) => (
        <Checkbox
          checked={verified}
          onChange={() => onCheckboxChange(!verified, record.id)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      title: <div className="text-table">{t("action.action")}</div>,
      key: "action",
      width: "1%",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: t("action.view"),
                  icon: (
                    <EyeOutlined style={{ fontSize: "18px", color: "gray" }} />
                  ),
                  onClick: () => navigator(`/patient/${record?.id}`),
                },
                {
                  key: "2",
                  label: t("action.edit"),
                  icon: (
                    <EditOutlined style={{ fontSize: "18px", color: "gray" }} />
                  ),
                  onClick: () => navigator(`/patient/${record?.id}/edit`),
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

export default PatientTable;
