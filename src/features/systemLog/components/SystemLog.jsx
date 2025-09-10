import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import styles from "../styles/SystemLog.module.css";
import { useState, useEffect } from "react";
import AdminTable from "components/table/AdminTable";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function getResponsiveTableWidth() {
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

function SystemLog(
  //   adminList = [],
  // isLoading = false,
  // pagination = {},
  // filter = {},
  // onDelete = () => {},
  // onChange = () => {},
  // onSubmit = () => {},
  // onClear = () => {},
  // onCheckboxChange = () => {},
){
    const navigate = useNavigate();
  const { t } = useTranslation();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());

  // useEffect(() => {
  //   setTableWidth(getResponsiveTableWidth());
  // }, [tableWidth]);

  return (
    <MainLayout
      title={t("system_log.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("system_log.header") },
      ]}
    >
      {/* <Space className={styles.container} direction="vertical" size={24}>
        <Row justify="end">
          <Space direction="horizontal" size={24}>
            <Button
              type="secondary"
              onClick={() => navigate("/create_user_management")}
            >
              {t("admin.create").toUpperCase()}
            </Button>
            
          </Space>
        </Row>
        
        <CardContainer width={tableWidth} height="fit-content">
          <AdminTable
            dataSource={adminList}
            onDelete={onDelete}
            isLoading={isLoading}
            pagination={pagination}
            onChange={onChange}
            onCheckboxChange={onCheckboxChange}
          />
        </CardContainer>
      </Space> */}
    </MainLayout>
  );
}

export default SystemLog;