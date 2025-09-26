import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Space,Select, Avatar,Radio,Card,Segmented} from "antd";
import { DownloadOutlined,FolderOpenOutlined,ShoppingCartOutlined,FileTextOutlined,GlobalOutlined } from "@ant-design/icons";
import { Button, CardContainer } from "components/elements";
// import { Select } from "components/form";
import styles from "../styles/OEEDashboard.module.css";
import { useState, useEffect, useCallback } from "react";
import OEETable from "components/table/OEETable";
import { OEEChart } from "./OEEChart";
import { OEEFactorsChart } from "./OEEFactorsChart";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/en';
dayjs.extend(customParseFormat);

function getResponsiveTableWidth() {
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

const OEEDashboardComponents = ({
    oeeList = [],
    oeeObj = {},
    oeeMachineObj = {},
    factorObj = {},
    machineDwl = [],
    overviewObj = {},
    oeeByMachineList={},
    isLoading = false,
    pagination = {},
    filter = {},
    onChange = () => { },

}) => {

  const { t } = useTranslation();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));
  const [scope, setScope] = useState('Monthly');
  const [machine, setMachine] = useState({});
  const [factor, setFactor] = useState('Availability');
  const [factordata, setFactorData] = useState({});

  dayjs.locale('en');

  useEffect(() => {
    setTableWidth(getResponsiveTableWidth());
    }, [tableWidth]);

  useEffect(() => {
    if (!machine?.key) return; 
    if(scope==='Monthly'){
      onChange({scope, duration:selectedMonth,machine:machine.key,drillDown:false});
    }else{
      onChange({scope, duration:selectedYear,machine:machine.key,drillDown:false});
    }
  }, [scope,selectedMonth,selectedYear]);

  useEffect(() => {
    if (!machine?.key) return; 
    if(scope==='Monthly'){
      onChange({scope, duration:selectedMonth,machine:machine.key,drillDown:true});
    }else{
      onChange({scope, duration:selectedYear,machine:machine.key,drillDown:true});
    }
  }, [machine]);

  useEffect(() => {
  if (Array.isArray(machineDwl) && machineDwl.length > 0) {
    const defaultMachine = machineDwl[0];
    setMachine(defaultMachine);
    if(scope==='Monthly'){
      onChange({scope, duration:selectedMonth,machine:defaultMachine.key});
    }else{
      onChange({scope, duration:selectedYear,machine:defaultMachine.key});
    }
  }
}, [machineDwl]);

useEffect(() => {
    if(factor === 'Availability'){
        setFactorData(factorObj.availability);
    }else if(factor === 'Performance'){
        setFactorData(factorObj.performance);
    }else if(factor === 'Quality'){
        setFactorData(factorObj.quality);
    }
    
  }, [factor,factorObj]);
  
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

  const machineOptions = machineDwl.map(machine => ({
        value: machine.key,
        label: machine.value,
    }));

  const handleChangeMachine = (value) => {
    setMachine(machineDwl.find(machine => machine.key===value));
    console.log(`selected: ${value}`);
  };

    return (
        <MainLayout
            title={t("oee_dashboard.header")}
            breadcrumb={[
                { title: t("home.header"), link: "/" },
                { title: t("oee_dashboard.header") },
            ]}
        >
            <Space className={styles.container} direction="vertical" size={24}>
                <Row justify="space-between">
                    <Col span={5}>
                        <CardContainer key={overviewObj.oee} height="fit-content" width="auto">
                            <Row justify="space-between">
                                <Col>
                                    <h4>{t("oee_dashboard.overview.oee")}</h4>
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
                                    <h4>{t("oee_dashboard.overview.availability")}</h4>
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
                                    <h4>{t("oee_dashboard.overview.performance")}</h4>
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
                                    <h4>{t("oee_dashboard.overview.quality")}</h4>
                                    <h4>{overviewObj.quality}</h4>
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
                                    options={['Monthly', 'Yearly']}
                                    onChange={e => setScope(e)}
                                />
                                {scope === 'Monthly' ? (
                                    <Select
                                        value={selectedMonth}
                                        style={{ width: 200 }}
                                        onChange={handleChangeMonth}
                                        options={monthOptions}
                                    />
                                ) : (
                                    <Select
                                        value={selectedYear}
                                        style={{ width: 200 }}
                                        onChange={handleChangeYear}
                                        options={yearOptions}
                                    />
                                )}
                            </Space>
                            <CardContainer width={"100%"} height="auto">
                                <Row justify="space-between">
                                    <h3>{t("oee_dashboard.label.oee_chart")}</h3>
                                </Row>
                                <OEEChart
                                    dataSource={oeeObj} />
                            </CardContainer>

                            <CardContainer width={tableWidth} height="fit-content">
                                <Row >
                                    <h3>{t("oee_dashboard.label.oee_by_machine")}</h3>
                                </Row>
                                <Row justify="left">
                                    {oeeByMachineList.map(card => {
                                        return (
                                            <Card
                                                key={card.machineName}
                                                style={{ width: '20%', margin: '10px' }}
                                            >
                                                <h3>{card.machineName}</h3>
                                                <small>{card.machineValue}</small>
                                            </Card>
                                        );
                                    })}
                                </Row>

                            </CardContainer>
                        </Space>

                    </Col>

                    <Col xs={24} md={12} lg={12} xl={12}>

                        <Space direction="vertical" size={24} style={{ width: '100%' }}>

                            <Space direction="horizontal" size={24}>
                                {/* <Radio.Group value={factor} defaultValue={'Availability'} onChange={e => setFactor(e.target.value)}>
                                    <Radio.Button value="Availability" selected>Availability</Radio.Button>
                                    <Radio.Button value="Performance">Performance</Radio.Button>
                                    <Radio.Button value="Quality">Quality</Radio.Button>
                                </Radio.Group> */}
                                <Segmented
                                    options={['Availability', 'Performance','Quality']}
                                    onChange={e => setFactor(e)}
                                />

                            </Space>
                            <CardContainer width={tableWidth} height="fit-content">
                                <Row justify="space-between">
                                    <h3>{factor}</h3>
                                </Row>
                                <OEEFactorsChart
                                    key={factor}
                                    dataSource={factordata} />

                            </CardContainer>
                            <Space direction="horizontal" size={24}>
                                <label>{t("oee_dashboard.label.machine")}</label>
                                <Select
                                    value={machine.key}
                                    placeholder="Select"
                                    style={{ width: 200 }}
                                    onChange={handleChangeMachine}
                                    options={machineOptions}
                                />
                            </Space>
                            <CardContainer width={tableWidth} height="fit-content">
                                <Row justify="space-between">
                                    <h3>{t("oee_dashboard.label.oee_machine_chart")} {machine.value}</h3>
                                </Row>
                                <Row justify="space-between">
                                    <Card key={oeeMachineObj?.overview?.oee} style={{ width: '20%', margin: '10px' }}>
                                    <h3>{t("oee_dashboard.overview.oee")}</h3>
                                    <h5>{oeeMachineObj?.overview?.oee}</h5>
                                    </Card>
                                    <Card key={oeeMachineObj?.overview?.availability} style={{ width: '20%', margin: '10px' }}>
                                    <h3>{t("oee_dashboard.overview.availability")}</h3>
                                    <h5>{oeeMachineObj?.overview?.availability}</h5>
                                    </Card>
                                    <Card key={oeeMachineObj?.overview?.performance} style={{ width: '20%', margin: '10px' }}>
                                    <h3>{t("oee_dashboard.overview.performance")}</h3>
                                    <h5>{oeeMachineObj?.overview?.performance}</h5>
                                    </Card>
                                    <Card key={oeeMachineObj?.overview?.quality} style={{ width: '20%', margin: '10px' }}>
                                    <h3>{t("oee_dashboard.overview.quality")}</h3>
                                    <h5>{oeeMachineObj?.overview?.quality}</h5>
                                    </Card>
                                </Row>
                                <OEEChart
                                    dataSource={oeeMachineObj} />

                            </CardContainer>

                        </Space>



                    </Col>
                    {/* </Space> */}
                </Row>
                <Row span={24}>
                <Col xs={24} md={24} lg={24} xl={24}>
                <CardContainer width={tableWidth} height="fit-content">
                                <Row>
                                    <h3>{t("oee_dashboard.label.oee_table")}</h3>
                                </Row>
                                <OEETable
                                    dataSource={oeeList}
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

export default OEEDashboardComponents;