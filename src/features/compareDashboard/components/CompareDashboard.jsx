import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space,Select, Avatar,Radio,DatePicker} from "antd";
import { DownloadOutlined,FolderOpenOutlined,ShoppingCartOutlined,FileTextOutlined,GlobalOutlined } from "@ant-design/icons";
import { Button, CardContainer } from "components/elements";
// import { Select } from "components/form";
import styles from "../styles/CompareDashboard.module.css";
import { useState, useEffect } from "react";
import CompareProductTable from "components/table/CompareProductTable";
import { useNavigate } from "react-router-dom";
import { ActualVsPlannedChart } from "../components/ActualVsPlannedChart";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/en';
dayjs.extend(customParseFormat);

const { Option } = Select;

function getResponsiveTableWidth() {
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

function CompareDashboard(
  CompareDashboardList=[],
  isLoading = false,
  pagination = {},
  filter = {},
  // onDelete = () => {},
  onChange = () => {},
  onSubmit = () => {},
  // onClear = () => {},
  // onCheckboxChange = () => {},
){
//   const navigate = useNavigate();
  const { t } = useTranslation();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));
  const [period, setPeriod] = useState('monthly');
  const [selectProduct,setSelectedProduct] = useState(CompareDashboardList.productDwl[0]);
  dayjs.locale('en');

  useEffect(() => {
    setTableWidth(getResponsiveTableWidth());
  }, [tableWidth]);

  useEffect(() => {
    //call api
  }, [period,selectedMonth,selectedYear,selectProduct]);

  
  console.log(period)

  const tableDataSource = Array.isArray(CompareDashboardList.compareProductList) ? CompareDashboardList.compareProductList : [];
  
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
  };

  const productOptions = CompareDashboardList.productDwl.map(product => ({
        value: product.key,
        label: product.value,
    }));

  const handleChangeProduct = (value) => {
    setSelectedProduct(value);
    console.log(`selected: ${value}`);
  };
  return (
    <MainLayout
      title={t("system_log.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("system_log.header") },
      ]}
    >
      <Space className={styles.container} direction="vertical" size={24}>
        <Row justify="space-between">
          <Col span={5}>
            <CardContainer height="fit-content" width="auto">
              <Row justify="space-between">
                <Col>
                  <h4>Planned Production</h4>
                  <h4>5000 units/day</h4>
                </Col>
                <Col>
                  <Avatar shape="square" icon={<FolderOpenOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                </Col>
              </Row>
            </CardContainer>
          </Col>
          <Col span={5}>
            <CardContainer height="fit-content" width="auto">
              <Row justify="space-between">
                <Col>
                  <h4>Actual Production</h4>
                  <h4>4800 units/day</h4>
                </Col>
                <Col>
                  <Avatar shape="square" icon={<GlobalOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                </Col>
              </Row>
            </CardContainer>
          </Col>
          <Col span={5}>
            <CardContainer height="fit-content" width="auto">
              <Row justify="space-between">
                <Col>
                  <h4>Completion (%)</h4>
                  <h4>80%</h4>
                </Col>
                <Col>
                  <Avatar shape="square" icon={<FileTextOutlined />} style={{ backgroundColor: 'var(--purple-color)' }} />
                </Col>
              </Row>


            </CardContainer>
          </Col>
          <Col span={5}>
            <CardContainer height="fit-content" width="auto">
              <Row justify="space-between">
                <Col>
                  <h4>OEE (%)</h4>
                  <h4>80%</h4>
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
                <Radio.Group value={period} onChange={e => setPeriod(e.target.value)}>
                  <Radio.Button value="monthly">Monthly</Radio.Button>
                  <Radio.Button value="yearly">Yearly</Radio.Button>
                </Radio.Group>
                {period === 'monthly' ? (
                <Select
                  key={period}
                  defaultValue={selectedMonth}
                  style={{ width: 200 }}
                  onChange={handleChangeMonth}
                  options={monthOptions}
                />
                ):(
                <Select
                  key={period}
                  defaultValue={selectedYear}
                  style={{ width: 200 }}
                  onChange={handleChangeYear}
                  options={yearOptions}
                />
                 )}

                 <Select
                  // key={product}
                  defaultValue={CompareDashboardList.productDwl[0]}
                  placeholder="Select"
                  style={{ width: 200 }}
                  onChange={handleChangeProduct}
                  options={productOptions}
                />
                </Space>
                <h2>Actual & Planned</h2>
                <CardContainer width={"100%"} height="auto">
                  <ActualVsPlannedChart />
                </CardContainer>



                <h2>Waste Product Compare</h2>
                <CardContainer width={tableWidth} height="fit-content">
                  <ActualVsPlannedChart />

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
                // onCheckboxChange={onCheckboxChange}
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

export default CompareDashboard;