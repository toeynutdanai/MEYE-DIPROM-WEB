import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space, Avatar, Radio, Card, Select, Input } from "antd";
import {
  DownloadOutlined,
  FolderOpenOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Button, CardContainer, CardStateContainer } from "components/elements";
import styles from "../styles/WarehouseTracking.module.css";
import { useState, useEffect } from "react";
import WarehouseTrackingTable from "components/table/WarehouseTrackingTable";
// import { Select } from "components/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/en";
dayjs.extend(customParseFormat);

function getResponsiveTableWidth() {
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

const WarehouseTrackingComponents = ({
  warehouseAndOrderList = [],
  productDwl = [],
  overviewObj = {},
  isLoading = false,
  pagination = {},
  filter = {},
  productCodes = [],
  setProductCodes = () => {},
  onChange = () => {},
  handleDownloadExcel = () => {},
}) => {
  const { t } = useTranslation();
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());

  //   dayjs.locale('en');

  useEffect(() => {
    setTableWidth(getResponsiveTableWidth());
  }, [tableWidth]);

  const productOptions = productDwl.map((product) => ({
    value: product.key,
    label: product.value,
  }));

  return (
    <MainLayout
      title={t("warehouse_and_order.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("warehouse_and_order.header") },
      ]}
    >
      <Space className={styles.container} direction="vertical" size={24}>
        <Row gutter={[20, 20]} align="stretch">
          <CardStateContainer
            label={t("warehouse_and_order.overview.oee")}
            state={overviewObj.oee}
            icon={<FolderOpenOutlined />}
            iconColor="var(--purple-color)"
            height="fit-content"
            width="auto"
          />
          <CardStateContainer
            label={t("warehouse_and_order.overview.availability")}
            state={overviewObj.availability}
            icon={<GlobalOutlined />}
            iconColor="var(--purple-color)"
            height="fit-content"
            width="auto"
          />
          <CardStateContainer
            label={t("warehouse_and_order.overview.performance")}
            state={overviewObj.performance}
            icon={<FileTextOutlined />}
            iconColor="var(--purple-color)"
            height="fit-content"
            width="auto"
          />
          <CardStateContainer
            label={t("warehouse_and_order.overview.quality")}
            state={overviewObj.quality}
            icon={<ShoppingCartOutlined />}
            iconColor="var(--purple-color)"
            height="fit-content"
            width="auto"
          />
        </Row>

        <Row span={24} justify="space-between">
          <Select
            // key={selectedProduct}
            mode="multiple"
            allowClear
            placeholder="Select"
            style={{ width: "50%" }}
            onChange={onChange}
            options={productOptions}
            required={true}
          />
          <Space>
            <label>Final Est Receiving Date</label>
            <Input placeholder="dd-mm-yyyy" readOnly={true} />
          </Space>
        </Row>
        <Row span={24}>
          <Col xs={24} md={24} lg={24} xl={24}>
            <CardContainer width={"100%"} height="fit-content">
              <Space direction="vertical" size={24} style={{ width: "100%" }}>
                <Row justify="space-between" align="middle">
                  <h3>
                    {t("warehouse_and_order.label.warehouse_tracking_table")}
                  </h3>
                  <Button
                    type="default"
                    aria-label="Download"
                    onClick={handleDownloadExcel}
                    loading={isLoading}
                    style={{
                      width: 32,
                      height: 48,
                      padding: 0,
                      borderRadius: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DownloadOutlined />
                  </Button>
                </Row>
                <WarehouseTrackingTable
                  dataSource={warehouseAndOrderList}
                  isLoading={isLoading}
                  pagination={pagination}
                  onChange={onChange}
                />
              </Space>
            </CardContainer>
          </Col>
        </Row>
      </Space>
    </MainLayout>
  );
};

export default WarehouseTrackingComponents;
