import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space,Select, Avatar,Radio,DatePicker,Segmented} from "antd";
import { DownloadOutlined,FolderOpenOutlined,ShoppingCartOutlined,FileTextOutlined,GlobalOutlined } from "@ant-design/icons";
import { Button, CardContainer } from "components/elements";
// import { Select } from "components/form";
import styles from "../styles/CompareDashboard.module.css";
import { useState, useEffect, useCallback } from "react";
import CompareProductTable from "components/table/CompareProductTable";
import { ActualVsPlannedChart } from "../components/ActualVsPlannedChart";
import { WastProductCompareChart } from "../components/WastProductCompareChart";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/en';
dayjs.extend(customParseFormat);

function getResponsiveTableWidth() {
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

const CompareDashboardComponents = ({
  compareProductList= [],
  actualVsPlanObj={},
  wasteProductCompareObj={},
  productDwl=[],
  overviewObj={},
  isLoading = false,
  pagination = {},
  filter = {},
  // onDelete = () => {},
  onChange = () => {},
  onSubmit = () => {},
  // onClear = () => {},
  // onCheckboxChange = () => {},

}) => {

  const { t } = useTranslation();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));
  const [scope, setScope] = useState('Monthly');
  const [product, setProduct] = useState(undefined);

  dayjs.locale('en');

  useEffect(() => {
    setTableWidth(getResponsiveTableWidth());
    }, [tableWidth]);

  useEffect(() => {
    if (!product) return; 
    if(scope==='Monthly'){
      onChange({scope, duration:selectedMonth,product});
    }else{
      onChange({scope, duration:selectedYear,product});
    }
  }, [scope,selectedMonth,selectedYear,product]);

  useEffect(() => {
  if (Array.isArray(productDwl) && productDwl.length > 0) {
    const defaultProduct = productDwl[0].key;
    setProduct(defaultProduct);
    if(scope==='Monthly'){
      onChange({scope, duration:selectedMonth,defaultProduct});
    }else{
      onChange({scope, duration:selectedYear,defaultProduct});
    }
  }
}, [productDwl]);

  const tableDataSource = Array.isArray(compareProductList) ? compareProductList : [];
  
  const generateMonthOptions = () => {
    const options = [];
    const today = dayjs();
    const lastYear = dayjs().subtract(1, 'year');
    let currentMonth = today;
    while (currentMonth.isAfter(lastYear) || currentMonth.isSame(lastYear, 'month')) {
      options.push({
        value: currentMonth.format('YYYY-MM'),
        label: currentMonth.format('MMMM-YYYY'),
      });
      currentMonth = currentMonth.subtract(1, 'month');
    }
    return options;
  };

  const monthOptions = generateMonthOptions();
  
  const handleChangeMonth = (value) => {
    setSelectedMonth(value);
    console.log(`selected: ${value}`);
    // onChange({scope, duration:value,product});
  };


  const generateYearOptions = () => {
    const options = [];
    const today = dayjs();
    const lastYear = dayjs().subtract(4, 'year');

    let currentYear = today;
    while (currentYear.isAfter(lastYear) || currentYear.isSame(lastYear, 'year')) {
      options.push({
        value: currentYear.format('YYYY'),
        label: currentYear.format('YYYY'),
      });
      currentYear = currentYear.subtract(1, 'year');
    }
    return options;
  };

  const yearOptions = generateYearOptions();
  
  const handleChangeYear = (value) => {
    setSelectedYear(value);
    console.log(`selected: ${value}`);
    // onChange({scope, duration:value.format('YYYY'),product});
  };

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
      title={t("compare_dashboard.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("compare_dashboard.header") },
      ]}
    >
      <Space className={styles.container} direction="vertical" size={24}>
        <Row justify="space-between">
          <Col span={5}>
            <CardContainer key={overviewObj?.plannedProduction} height="fit-content" width="auto">
              <Row justify="space-between">
                <Col>
                  <h4>{t("compare_dashboard.overview.planned_production")}</h4>
                  <h4>{overviewObj?.plannedProduction}</h4>
                </Col>
                <Col>
                  <Avatar shape="square" icon={<FolderOpenOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                </Col>
              </Row>
            </CardContainer>
          </Col>
          <Col span={5}>
            <CardContainer key={overviewObj?.actualProduction} height="fit-content" width="auto">
              <Row justify="space-between">
                <Col>
                  <h4>{t("compare_dashboard.overview.actual_production")}</h4>
                  <h4>{overviewObj?.actualProduction}</h4>
                </Col>
                <Col>
                  <Avatar shape="square" icon={<GlobalOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                </Col>
              </Row>
            </CardContainer>
          </Col>
          <Col span={5}>
            <CardContainer key={overviewObj?.completion} height="fit-content" width="auto">
              <Row justify="space-between">
                <Col>
                  <h4>{t("compare_dashboard.overview.completion")}</h4>
                  <h4>{overviewObj?.completion}</h4>
                </Col>
                <Col>
                  <Avatar shape="square" icon={<FileTextOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                </Col>
              </Row>


            </CardContainer>
          </Col>
          <Col span={5}>
            <CardContainer key={overviewObj?.oee} height="fit-content" width="auto">
              <Row justify="space-between">
                <Col>
                  <h4>{t("compare_dashboard.overview.oee")}</h4>
                  <h4>{overviewObj?.oee}</h4>
                </Col>
                <Col>
                  <Avatar shape="square" icon={<ShoppingCartOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                </Col>
              </Row>
            </CardContainer>
          </Col>
        </Row>


        <Row justify="space-between" gutter={[24, 24]}>
          

            <Col xs={24} md={12} lg={12} xl={12}>
              <Space direction="vertical" size={24} style={{ width: '100%' }}>
                <Space direction="horizontal" size={24}>
                {/* <Radio.Group value={scope} onChange={e => setScope(e.target.value)}>
                  <Radio.Button value="monthly">Monthly</Radio.Button>
                  <Radio.Button value="yearly">Yearly</Radio.Button>
                </Radio.Group> */}
                <Segmented
                options={['Monthly','Yearly']}
                onChange={e => setScope(e)}
                />
                {scope === 'Monthly' ? (
                <Select
                  // key={scope}
                  value={selectedMonth}
                  // defaultValue={selectedMonth}
                  style={{ width: 200 }}
                  onChange={handleChangeMonth}
                  options={monthOptions}
                />
                ):(
                <Select
                  // key={scope}
                  value={selectedYear}
                  // defaultValue={selectedYear}
                  style={{ width: 200 }}
                  onChange={handleChangeYear}
                  options={yearOptions}
                />
                 )}

                 <Select
                  value={product}
                  defaultValue={productDwl[0]}
                  placeholder="Select"
                  style={{ width: 200 }}
                  onChange={handleChangeProduct}
                  options={productOptions}
                />
                </Space>
                <h2>Actual & Planned</h2>
                <CardContainer width={"100%"} height="auto">
                  <ActualVsPlannedChart 
                  dataSource={actualVsPlanObj}/>
                </CardContainer>



                <h2>Waste Product Compare</h2>
                <CardContainer width={tableWidth} height="fit-content">
                  <WastProductCompareChart 
                  dataSource={wasteProductCompareObj}/>

                </CardContainer>
              </Space>

               </Col>

        {/* ส่วนของตาราง */}
        <Col xs={24} md={12} lg={12} xl={12}>

            <Space direction="vertical" size={24} style={{ width: '100%' }}>

              <CardContainer width={tableWidth} height="fit-content">
                <Row justify="space-between">
                  <h3>Compare Product : </h3>
                  <Button ><DownloadOutlined /></Button>
                </Row>
                <CompareProductTable
                  dataSource={tableDataSource}
                  isLoading={isLoading}
                  pagination={pagination}
                  onChange={onChange}
                />
              </CardContainer>
            </Space>



            </Col>
          {/* </Space> */}
      </Row>

    </Space>
    </MainLayout >
  );
}

export default CompareDashboardComponents;