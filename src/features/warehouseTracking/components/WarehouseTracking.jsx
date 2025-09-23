import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space, Avatar,Radio,Card,Select,Input } from "antd";
import { DownloadOutlined,FolderOpenOutlined,ShoppingCartOutlined,FileTextOutlined,GlobalOutlined } from "@ant-design/icons";
import { Button, CardContainer } from "components/elements";
import styles from "../styles/WarehouseTracking.module.css";
import { useState, useEffect} from "react";
import WarehouseTrackingTable from "components/table/WarehouseTrackingTable";
// import { Select } from "components/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/en';
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
    onChange = () => { },

}) => {

  const { t } = useTranslation();
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());

//   dayjs.locale('en');

  useEffect(() => {
    setTableWidth(getResponsiveTableWidth());
    }, [tableWidth]);


    const productOptions = productDwl.map(product => ({
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
                <Row justify="space-between">
                    <Col span={5}>
                        <CardContainer key={overviewObj.oee} height="fit-content" width="auto">
                            <Row justify="space-between">
                                <Col>
                                    <h4>{t("warehouse_and_order.overview.oee")}</h4>
                                    <h4>{overviewObj.oee}</h4>
                                </Col>
                                <Col>
                                    <Avatar shape="square" icon={<FolderOpenOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                                </Col>
                            </Row>
                        </CardContainer>
                    </Col>
                    <Col span={5}>
                        <CardContainer key={overviewObj.availability} height="fit-content" width="auto">
                            <Row justify="space-between">
                                <Col>
                                    <h4>{t("warehouse_and_order.overview.availability")}</h4>
                                    <h4>{overviewObj.availability}</h4>
                                </Col>
                                <Col>
                                    <Avatar shape="square" icon={<GlobalOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                                </Col>
                            </Row>
                        </CardContainer>
                    </Col>
                    <Col span={5}>
                        <CardContainer key={overviewObj.performance} height="fit-content" width="auto">
                            <Row justify="space-between">
                                <Col>
                                    <h4>{t("warehouse_and_order.overview.performance")}</h4>
                                    <h4>{overviewObj.performance}</h4>
                                </Col>
                                <Col>
                                    <Avatar shape="square" icon={<FileTextOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                                </Col>
                            </Row>
                        </CardContainer>
                    </Col>
                    <Col span={5}>
                        <CardContainer key={overviewObj.quality} height="fit-content" width="auto">
                            <Row justify="space-between">
                                <Col>
                                    <h4>{t("warehouse_and_order.overview.quality")}</h4>
                                    <h4>{overviewObj.quality}</h4>
                                </Col>
                                <Col>
                                    <Avatar shape="square" icon={<ShoppingCartOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                                </Col>
                            </Row>
                        </CardContainer>
                    </Col>
                </Row>

                <Row span={24} justify="space-between">
                    <Select
                        // key={selectedProduct}
                        mode="multiple"
                        allowClear
                        placeholder="Select"
                        style={{ width: '50%' }}
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
                            <Row>
                                <h3>{t("warehouse_and_order.label.warehouse_tracking_table")}</h3>
                            </Row>
                            <WarehouseTrackingTable
                                dataSource={warehouseAndOrderList}
                                isLoading={isLoading}
                                pagination={pagination}
                                onChange={onChange}
                            />
                        </CardContainer>
                    </Col>

                </Row>

            </Space>
        </MainLayout >
    );
}

export default WarehouseTrackingComponents;