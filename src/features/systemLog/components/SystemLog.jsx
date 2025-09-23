import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import styles from "../styles/SystemLog.module.css";
import { useState, useEffect } from "react";
import SystemLogTable from "components/table/SystemLogTable";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function getResponsiveTableWidth() {
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

const SystemLogComponents = ({
  LogList = [],
  isLoading = false,
  pagination = {},
  filter = {},
  onChange = () => {},
})=>{
    const navigate = useNavigate();
  const { t } = useTranslation();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());
  
  useEffect(() => {
    setTableWidth(getResponsiveTableWidth());
  }, [tableWidth]);

  console.log(LogList);
  const tableDataSource = Array.isArray(LogList.logList) ? LogList.logList : [];

  return (
    <MainLayout
      title={t("system_log.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("system_log.header") },
      ]}
    >
      <Space className={styles.container} direction="vertical" size={24}>
        <CardContainer width={tableWidth} height="fit-content">
          <SystemLogTable
            dataSource={tableDataSource}
            isLoading={isLoading}
            pagination={pagination}
          />
        </CardContainer>
      </Space>
    </MainLayout>
  );
}

export default SystemLogComponents;