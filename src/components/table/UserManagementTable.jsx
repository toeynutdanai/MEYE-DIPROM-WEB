import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Table, Space, Dropdown } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

const UserManagementTable = ({
    onChange = () => { },
    onDelete = () => { },
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
                    {t("user_management.label.record_no")}
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
            title: (
                <div className="text-table">
                    {t("user_management.label.name")}
                </div>
            ),
            dataIndex: "id" /* model's property */,
            key: "id" /* model's property */,
            render: (_, __, index) => {
                const currentPage = pagination?.current || 1;
                const pageSize = pagination?.pageSize || 10;
                return (
                    <div style={{ textAlign: "center" }}>
                        {isLoading ? "-" : (currentPage - 1) * pageSize + index + 1}
                    </div>
                );
            },
        },
        {
            title: (
                <div className="text-table">
                    {t("user_management.label.email")}
                </div>
            ),
            dataIndex: "id" /* model's property */,
            key: "id" /* model's property */,
            render: (_, __, index) => {
                const currentPage = pagination?.current || 1;
                const pageSize = pagination?.pageSize || 10;
                return (
                    <div style={{ textAlign: "center" }}>
                        {isLoading ? "-" : (currentPage - 1) * pageSize + index + 1}
                    </div>
                );
            },
        },
        {
            title: (
                <div className="text-table">
                    {t("user_management.label.tel")}
                </div>
            ),
            dataIndex: "id" /* model's property */,
            key: "id" /* model's property */,
            render: (_, __, index) => {
                const currentPage = pagination?.current || 1;
                const pageSize = pagination?.pageSize || 10;
                return (
                    <div style={{ textAlign: "center" }}>
                        {isLoading ? "-" : (currentPage - 1) * pageSize + index + 1}
                    </div>
                );
            },
        },
        {
            title: (
                <div className="text-table">
                    {t("user_management.label.createBy")}
                </div>
            ),
            dataIndex: "id" /* model's property */,
            key: "id" /* model's property */,
            render: (_, __, index) => {
                const currentPage = pagination?.current || 1;
                const pageSize = pagination?.pageSize || 10;
                return (
                    <div style={{ textAlign: "center" }}>
                        {isLoading ? "-" : (currentPage - 1) * pageSize + index + 1}
                    </div>
                );
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
    ]

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
}

export default UserManagementTable