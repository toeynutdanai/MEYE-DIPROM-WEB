// components/OEEDashboard.jsx
import {
  DownloadOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  GlobalOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Col, Row, Segmented, Select, Space } from "antd";
import {
  Button,
  CardContainer,
  CardScoreContainer,
  CardStateContainer,
} from "components/elements";
import { MainLayout } from "components/layouts";
import OEETable from "components/table/OEETable";
import { OEEChart } from "./OEEChart";
import { OEEFactorsChart } from "./OEEFactorsChart";
import { OEEMachineChart } from "./OEEMachineChart";

const OEEDashboardComponents = ({
  // i18n
  t,

  // store data
  oeeList = [],
  oeeObj = [],
  oeeMachineObj = {},
  oeeByMachineList = [],
  overviewObj = {},
  isLoading = false,

  tableWidth = "100%",
  scope = "",
  setScope = () => { },
  selectedMonth = "",
  selectedYear = "",
  handleChangeMonth = () => { },
  handleChangeYear = () => { },
  handleDownloadExcel = () => { },

  factor = "",
  setFactor = () => { },
  factorObj = [],

  factorByMachine = "",
  setFactorByMachine = () => { },

  machine,
  machineOptions = [],
  handleChangeMachine = () => { },

  monthOptions = [],
  yearOptions = [],

  // table
  pagination,
  onChange,
}) => {
  return (
    <MainLayout
      title={t("oee_dashboard.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("oee_dashboard.header") },
      ]}
    >
      <Row gutter={[20, 20]} align="stretch">
        {/* <CardStateContainer
          label={t("oee_dashboard.overview.oee")}
          state={overviewObj?.oee}
          icon={<FolderOpenOutlined />}
          iconColor="var(--purple-color)"
          height="fit-content"
          width="auto"
        />
        <CardStateContainer
          label={t("oee_dashboard.overview.availability")}
          state={overviewObj?.availability}
          icon={<GlobalOutlined />}
          iconColor="var(--purple-color)"
          height="fit-content"
          width="auto"
        />
        <CardStateContainer
          label={t("oee_dashboard.overview.performance")}
          state={overviewObj?.performance}
          icon={<FileTextOutlined />}
          iconColor="var(--purple-color)"
          height="fit-content"
          width="auto"
        />
        <CardStateContainer
          label={t("oee_dashboard.overview.quality")}
          state={overviewObj?.quality}
          icon={<ShoppingCartOutlined />}
          iconColor="var(--purple-color)"
          height="fit-content"
          width="auto"
        /> */}

        <Col xs={24} xl={12}>
          <Space direction="vertical" size={24} style={{ width: "100%" }}>
            <Space direction="horizontal" size={24}>
              <Segmented
                options={["Monthly", "Yearly"]}
                value={scope}
                onChange={(v) => setScope(v)}
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              />
              {scope === "Monthly" ? (
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
              <OEEChart dataSource={oeeObj} isLoading={isLoading} />
            </CardContainer>
          </Space>
        </Col>

        <Col xs={24} xl={12}>
          <Space direction="vertical" size={24} style={{ width: "100%" }}>
            <Space direction="horizontal" size={24}>
              <Segmented
                options={["Availability", "Performance", "Quality"]}
                value={factor}
                onChange={(v) => setFactor(v)}
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              />
            </Space>

            <CardContainer width={tableWidth} height="fit-content">
              <Row justify="space-between">
                <h3>{factor}</h3>
              </Row>
              <OEEFactorsChart factorTitle={factor} dataSource={factorObj} isLoading={isLoading} />
            </CardContainer>
          </Space>
        </Col>

        <Col xs={24} xl={12}>
          <CardContainer width={tableWidth} height="100%">
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <h3>{t("oee_dashboard.label.oee_by_machine")}</h3>
              <Row gutter={[20, 20]} align="stretch">
                {(oeeByMachineList || []).map((card) => (
                  <CardScoreContainer
                    label={card.machineName}
                    state={card.percent}
                    xs = {24}
                    md = {12}
                    lg = {8}
                    unit={"%"}
                  />
                ))}
              </Row>
            </Space>
          </CardContainer>
        </Col>

        <Col xs={24} xl={12}>
          <Space direction="vertical" size={24} style={{ width: "100%" }}>
            <Space direction="horizontal" size={24}>
              <label>{t("oee_dashboard.label.machine")}</label>
              <Select
                value={machine?.key}
                placeholder="Select"
                style={{ width: 200 }}
                onChange={handleChangeMachine}
                options={machineOptions}
              />
              <Segmented
                options={["Availability", "Performance", "Quality"]}
                value={factorByMachine}
                onChange={(v) => setFactorByMachine(v)}
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              />
            </Space>

            <CardContainer width={tableWidth} height="fit-content">
              <Space direction="vertical" size={24} style={{ width: "100%" }}>
                <h3>
                  {t("oee_dashboard.label.oee_machine_chart")} {machine?.value}
                </h3>
                <Row gutter={[20, 20]} align="stretch">
                  <CardScoreContainer
                    type={false}
                    label={t("oee_dashboard.overview.oee")}
                    state={oeeMachineObj?.oeePercent}
                    unit={"%"}
                  />
                  <CardScoreContainer
                    type={false}
                    label={t("oee_dashboard.overview.availability")}
                    state={oeeMachineObj?.availabilityPercent}
                    unit={"%"}
                  />
                  <CardScoreContainer
                    type={false}
                    label={t("oee_dashboard.overview.performance")}
                    state={oeeMachineObj?.performancePercent}
                    unit={"%"}
                  />
                  <CardScoreContainer
                    type={false}
                    label={t("oee_dashboard.overview.quality")}
                    state={oeeMachineObj?.qualityPercent}
                    unit={"%"}
                  />
                </Row>
                <OEEMachineChart dataSource={oeeMachineObj} isLoading={isLoading} factorByMachine={factorByMachine}/>
              </Space>
            </CardContainer>
          </Space>
        </Col>

        <Col span={24}>
          <CardContainer width={tableWidth} height="fit-content">
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <Row justify="space-between" align="middle">
                <h3>{t("oee_dashboard.label.oee_table")}</h3>
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
                  <DownloadOutlined style={{ fontSize: '20px',fontWeight: 'bold' }}/>
                </Button>
              </Row>
              <OEETable
                dataSource={oeeList}
                isLoading={isLoading}
                pagination={pagination}
                onChange={onChange}
              />
            </Space>
          </CardContainer>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default OEEDashboardComponents;
