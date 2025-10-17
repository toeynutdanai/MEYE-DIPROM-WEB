import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Segmented, Space,DatePicker,Row,Col,Input,Typography} from "antd";
import { CardContainer } from "components/elements";
import styles from "../styles/SystemLog.module.css";
import AccessLogTable from "components/table/AccessLogTable";
import InterfaceLogTable from "components/table/InterfaceLogTable";
import SystemLogSearch from "../components/SystemLogSearch";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.locale("en");

const SystemLogComponents = ({
  isLoading = false,
  pagination = {},
  filter = {},
  onChange = () => {},
  onClick = () => {},
  handleDownloadExcel = () => {},
  logAccessList = [],
  logInterfaceList = [],
  logType = 'Access Log',
  search = {},
  setLogType = () =>{},
  setSearch = () =>{},
  tableWidth = "100%",
})=>{
  const { t } = useTranslation();

  return (
    <MainLayout
      title={t("system_log.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("system_log.header") },
      ]}
    >
      <Space className={styles.container} direction="vertical" size={24}>
            <Space
              direction="horizontal"
              wrap
              size={12}
              style={{ width: "100%" }}
            >
              <Segmented
                options={["Access Log", "Interface Log"]}
                value={logType}
                onChange={(val) => setLogType(val)}
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              />
            </Space>
        
        {logType === "Access Log" ? (
          <CardContainer width={tableWidth} height="fit-content">
            <Space
              direction="vertical"
              wrap
              size={12}
              style={{ width: "100%" }}
            >
              <Typography.Title level={4} className={styles.titleDim}>
                {t("system_log.access_header")}
              </Typography.Title>
              <SystemLogSearch
                onClick={onClick}
                logType={logType}
                search={search}
                setSearch={setSearch}
              />
            <AccessLogTable
              dataSource={logAccessList}
              isLoading={isLoading}
              pagination={pagination}
              onChange={onChange}
            />
            </Space>
          </CardContainer>
              ) : (
            <CardContainer width={tableWidth} height="fit-content">
              <Space
              direction="vertical"
              wrap
              size={12}
              style={{ width: "100%" }}
            >
              <Typography.Title level={4} className={styles.titleDim}>
                {t("system_log.interface_header")}
              </Typography.Title>
              <SystemLogSearch
                onClick={onClick}
                logType={logType}
                search={search}
                setSearch={setSearch}
              />
              <InterfaceLogTable
                dataSource={logInterfaceList}
                isLoading={isLoading}
                pagination={pagination}
                onChange={onChange}
                handleDownloadExcel={handleDownloadExcel}
              />
              </Space>
            </CardContainer>
              )}
      </Space>
    </MainLayout>
  );
}

export default SystemLogComponents;