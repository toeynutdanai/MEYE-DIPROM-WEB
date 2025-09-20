import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space,Select, Avatar,Radio,Card} from "antd";
import { DownloadOutlined,FolderOpenOutlined,ShoppingCartOutlined,FileTextOutlined,GlobalOutlined } from "@ant-design/icons";
import { Button, CardContainer } from "components/elements";
// import { Select } from "components/form";
import styles from "../styles/WarehouseTracking.module.css";
import { useState, useEffect} from "react";
import WarehouseTrackingTable from "components/table/WarehouseTrackingTable";
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
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());
  const [product, setProduct] = useState({});

  dayjs.locale('en');

  useEffect(() => {
    setTableWidth(getResponsiveTableWidth());
    }, [tableWidth]);

//   useEffect(() => {
//     if (!machine?.key) return; 
//     if(scope==='monthly'){
//       onChange({scope, duration:selectedMonth,machine:machine.key,drillDown:false});
//     }else{
//       onChange({scope, duration:selectedYear,machine:machine.key,drillDown:false});
//     }
//   }, [scope,selectedMonth,selectedYear]);

//   useEffect(() => {
//     if (!machine?.key) return; 
//     if(scope==='monthly'){
//       onChange({scope, duration:selectedMonth,machine:machine.key,drillDown:true});
//     }else{
//       onChange({scope, duration:selectedYear,machine:machine.key,drillDown:true});
//     }
//   }, [machine]);

//   useEffect(() => {
//   if (Array.isArray(machineDwl) && machineDwl.length > 0) {
//     const defaultMachine = machineDwl[0];
//     setMachine(defaultMachine);
//     if(scope==='monthly'){
//       onChange({scope, duration:selectedMonth,machine:defaultMachine.key});
//     }else{
//       onChange({scope, duration:selectedYear,machine:defaultMachine.key});
//     }
//   }
// }, [machineDwl]);

// useEffect(() => {
//     if(factor === 'Availability'){
//         setFactorData(factorObj.availability);
//     }else if(factor === 'Performance'){
//         setFactorData(factorObj.performance);
//     }else if(factor === 'Quality'){
//         setFactorData(factorObj.quality);
//     }
    
//   }, [factor,factorObj]);
  
//   const generateMonthOptions = () => {
//     const options = [];
//     const today = dayjs();
//     const lastYear = dayjs().subtract(1, 'year');
//     let currentMonth = today;
//     while (currentMonth.isAfter(lastYear) || currentMonth.isSame(lastYear, 'month')) {
//       options.push({
//         value: currentMonth.format('YYYY-MM'),
//         label: currentMonth.format('MMMM-YYYY'),
//       });
//       currentMonth = currentMonth.subtract(1, 'month');
//     }
//     return options;
//   };

//   const monthOptions = generateMonthOptions();
  
//   const handleChangeMonth = (value) => {
//     setSelectedMonth(value);
//     console.log(`selected: ${value}`);
//   };


//   const generateYearOptions = () => {
//     const options = [];
//     const today = dayjs();
//     const lastYear = dayjs().subtract(4, 'year');

//     let currentYear = today;
//     while (currentYear.isAfter(lastYear) || currentYear.isSame(lastYear, 'year')) {
//       options.push({
//         value: currentYear.format('YYYY'),
//         label: currentYear.format('YYYY'),
//       });
//       currentYear = currentYear.subtract(1, 'year');
//     }
//     return options;
//   };

//   const yearOptions = generateYearOptions();
  
//   const handleChangeYear = (value) => {
//     setSelectedYear(value);
//     console.log(`selected: ${value}`);
//   };

    const productOptions = productDwl.map(product => ({
        value: product.key,
        label: product.value,
    }));

  const handleChangeProduct = (value) => {
    setProduct(value);
    console.log(`selected: ${value}`);
    // onChange({scope, duration,product:value});
  };

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

                <Row span={24}>

                    <Col xs={24} md={24} lg={24} xl={24}>
                            <Space direction="horizontal" size={24}>
                                <Select
                                                  key={product}
                                                  defaultValue={productDwl[0]}
                                                  placeholder="Select"
                                                  style={{ width: 200 }}
                                                  onChange={handleChangeProduct}
                                                  options={productOptions}
                                                />
                            </Space>
                           

                    </Col>
                </Row>


                
                <Row span={24}>
                <Col xs={24} md={24} lg={24} xl={24}>
                <CardContainer width={tableWidth} height="fit-content">
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