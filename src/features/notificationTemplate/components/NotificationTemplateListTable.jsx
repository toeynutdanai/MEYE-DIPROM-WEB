import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Space, Switch, Table } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

const NotificationTemplateListTable = ({
  isLoading = false,
  pagination = {},
  dataSource = [],
  onStatus = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: <div className="text-table">ID</div>,
      dataIndex: "index",
      key: "index",
    },
    {
      title: <div className="text-table">Subject</div>,
      dataIndex: "emailType.subject",
      key: "emailType.subject",
      sorter: (a, b) => a.emailType.subject.length - b.emailType.subject.length,
      render: (_, row) => {
        return i18n.language === "en" && row.emailType.subjectEn
          ? row.emailType.subjectEn
          : row.emailType.subject;
      },
    },
    {
      title: <div className="text-table">Language</div>,
      dataIndex: "languageType",
      key: "languageType",
      sorter: (a, b) => a.languageType.length - b.languageType.length,
    },
    {
      title: <div className="text-table">Event</div>,
      dataIndex: "description",
      key: "description",
    },
    {
      title: <div className="text-table">Last Modified</div>,
      dataIndex: "modified",
      key: "modified",
      render: (_, record) => {
        const { lastModified = {} } = record;
        const name =
          i18n.language === "en" && lastModified.nameEn
            ? lastModified.nameEn
            : lastModified.name;
        return (
          <>
            {name}
            <br />
            {lastModified.time
              ? moment
                  .utc(lastModified.time)
                  .utcOffset("+0700")
                  .add(543, "years")
                  .format("DD/MM/YYYY HH:mm")
              : "-"}
          </>
        );
      },
    },
    {
      title: <div className="text-table">Status</div>,
      dataIndex: "statusFlag",
      key: "statusFlag",
      render: (text, record) => (
        <Switch
          checked={text === "ACTIVE"}
          onChange={(checked) => onStatus(checked, record)}
        />
      ),
    },
    {
      title: <div className="text-table">Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <p
                      style={{ color: "grey", fontSize: "14px" }}
                      onClick={() => {
                        onEdit(record);
                      }}
                    >
                      Edit
                    </p>
                  ),
                  icon: (
                    <EditOutlined style={{ fontSize: "18px", color: "gray" }} />
                  ),
                },
                {
                  key: "2",
                  label: (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      href="#"
                      onClick={() => {
                        onDelete(record);
                      }}
                      style={{ color: "grey", fontSize: "14px" }}
                    >
                      Delete
                    </a>
                  ),
                  icon: (
                    <DeleteOutlined
                      style={{ fontSize: "18px", color: "gray" }}
                    />
                  ),
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
      loading={isLoading}
      pagination={{
        ...pagination,
        showTotal: (total, range) =>
          t("paginate.description")
            .replace("{min}", range[0])
            .replace("{max}", range[1])
            .replace("{total}", total),
      }}
      dataSource={dataSource}
      rowKey={(record) => record.id}
      columns={columns}
      scroll={{ x: true }}
    />
  );
};

export default NotificationTemplateListTable;
