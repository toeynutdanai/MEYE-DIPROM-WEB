// pages/CompareDashboardComponents.jsx
import { DownloadOutlined } from "@ant-design/icons";
import { Col, Row, Segmented, Select, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import { MainLayout } from "components/layouts";
import CompareProductTable from "components/table/CompareProductTable";
import { useTranslation } from "react-i18next";
import { ActualVsPlannedChart } from "../components/ActualVsPlannedChart";
import { WastProductCompareChart } from "../components/WastProductCompareChart";
// import styles from "../styles/CompareDashboard.module.css";

const CompareDashboardComponents = ({
  compareProductList = [],
  actualVsPlanObj = {},
  wasteProductCompareObj = {},
  isLoading = false,

  pagination = { page: 0, size: 25, total: 0 },

  scope = "Monthly", // "Monthly" | "Yearly"
  selectedMonth = "",
  selectedYear = "",
  selectedProducts = [],
  monthOptions = [],
  yearOptions = [],
  productOptions = [],

  handleChangeScope = () => {},
  handleChangeMonth = () => {},
  handleChangeYear = () => {},
  handleChangeProduct = () => {},
  handleDownloadExcel = () => {},
  handleOnChange = () => {},

  tableWidth = "100%",
}) => {
  const { t } = useTranslation();

  return (
    <MainLayout
      title={t("compare_dashboard.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("compare_dashboard.header") },
      ]}
    >
      <Row gutter={[20, 20]} align="stretch">
        <Col span={24}>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <Row
              horizontal
              wrap
              gutter={24}
              style={{ width: "100%" }}
            >
              <Col xs={8} xl={4} >
              <Segmented
                options={["Monthly", "Yearly"]}
                value={scope}
                onChange={handleChangeScope}
                style={{ border: "1px solid rgba(0,0,0,0.08)"}}
                block
              />
              </Col>
              <Col xs={8} xl={4}>
              {scope === "Monthly" ? (
                <Select
                  value={selectedMonth}
                  style={{ width: '100%' }}
                  onChange={handleChangeMonth}
                  options={monthOptions}
                />
              ) : (
                <Select
                  value={selectedYear}
                  style={{ width: '100%' }}
                  onChange={handleChangeYear}
                  options={yearOptions}
                />
              )}
              </Col>
              <Col xs={8} xl={4}>
              <Select
                value={selectedProducts}
                placeholder="Select"
                style={{ width: '100%' }}
                onChange={handleChangeProduct}
                options={productOptions}
              />
              </Col>
            </Row>
          </Space>
        </Col>

        <Col xs={24} xl={12}>
          <CardContainer width={"100%"} height="auto">
            <h3>Actual & Planned</h3>
            <ActualVsPlannedChart
              dataSource={actualVsPlanObj}
              isLoading={isLoading}
            />
          </CardContainer>
        </Col>

        <Col xs={24} xl={12}>
          <CardContainer width={tableWidth} height="fit-content">
            <h3>Waste Product Compare</h3>
            <WastProductCompareChart
              dataSource={wasteProductCompareObj}
              isLoading={isLoading}
            />
          </CardContainer>
        </Col>

        {/* Table */}
        <Col span={24}>
          <CardContainer width={tableWidth} height="fit-content">
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <Row justify="space-between" align="middle">
                <h3>
                  Compare Product :{" "}
                  {productOptions
                    .filter((option) => option.value === selectedProducts[0])
                    .map((option) => option.label)}
                </h3>
                <Button
                  type="default"
                  aria-label="Download"
                  onClick={handleDownloadExcel}
                  loading={isLoading}
                  style={{
                    width: 24,
                    height: 48,
                    padding: 0,
                    borderRadius: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DownloadOutlined
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  />
                </Button>
              </Row>
              <CompareProductTable
                dataSource={compareProductList}
                isLoading={isLoading}
                pagination={pagination}
                scope={scope}
                onChange={handleOnChange}
              />
            </Space>
          </CardContainer>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default CompareDashboardComponents;
