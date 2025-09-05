import { MainLayout } from 'components/layouts'
import React from 'react'
import { useTranslation } from "react-i18next";
import { Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import UserManagementTable from "components/table/UserManagementTable"
import styles from "../styles/UserManagement.module.css"
import { useState, useEffect } from 'react';
import { PlusOutlined, FilterOutlined } from "@ant-design/icons"

function UserManagementListComponent() {
    const { t } = useTranslation();
    const [tableWidth, setTableWidth] = useState(
        window.innerWidth > 1000 ?
            document.documentElement.clientWidth - 56 - 213.83
            : document.documentElement.clientWidth - 26
    )
    const [showFilterForm, setShowFilterForm] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setTableWidth(
                window.innerWidth > 1000 ?
                    document.documentElement.clientWidth - 56 - 213.83
                    : document.documentElement.clientWidth - 26
            );
        };

        window.addEventListener("resize", handleResize);
    }, [tableWidth])

    return (
        <MainLayout
            title={t("user_management.header")}
            breadcrumb={[
                { title: t("home.header"), link: "/" },
                { title: t("user_management.header") }
            ]}
        >
            <Space className={styles.container} direction="vertical" size={24}>
                <Row justify="end">
                    <Button
                        type="default"
                        onClick={() => setShowFilterForm(!showFilterForm)}
                    >
                        {t("common.filter")} <FilterOutlined />
                    </Button>
                    <Button type="default">{t("user_management.add")} <PlusOutlined /></Button>
                </Row>
                <CardContainer width={`${tableWidth}px`} height="fit-content">
                    <UserManagementTable />
                </CardContainer>
            </Space>
        </MainLayout>
    )
}

export default UserManagementListComponent