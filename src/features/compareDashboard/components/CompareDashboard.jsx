// pages/CompareDashboardComponents.jsx
import {
  DownloadOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  GlobalOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Col, Row, Segmented, Select, Space } from "antd";
import { Button, CardContainer, CardStateContainer } from "components/elements";
import { MainLayout } from "components/layouts";
import CompareProductTable from "components/table/CompareProductTable";
import { useTranslation } from "react-i18next";
import { ActualVsPlannedChart } from "../components/ActualVsPlannedChart";
import { WastProductCompareChart } from "../components/WastProductCompareChart";
// import styles from "../styles/CompareDashboard.module.css";

const CompareDashboardComponents = ({
  compareProductList = [],
  actualVsPlanObj,
  wasteProductCompareObj,
  productDwl,
  overviewObj,
  isLoading,
  pagination,
  scope,
  setScope,
  selectedMonth,
  selectedYear,
  product,
  monthOptions,
  yearOptions,
  productOptions,
  handleChangeMonth,
  handleChangeYear,
  handleChangeProduct,
  tableWidth,
}) => {
  const { t } = useTranslation();
  const tableDataSource = Array.isArray(compareProductList)
    ? compareProductList
    : [];

  return (
    <MainLayout
      title={t("compare_dashboard.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("compare_dashboard.header") },
      ]}
    >
      <Row gutter={[20, 20]} align="stretch">
        <CardStateContainer
          label={t("compare_dashboard.overview.planned_production")}
          state={overviewObj?.plannedProduction}
          icon={<FolderOpenOutlined />}
          iconColor="var(--purple-color)"
          height="fit-content"
          width="auto"
        />
        <CardStateContainer
          label={t("compare_dashboard.overview.actual_production")}
          state={overviewObj?.actualProduction}
          icon={<GlobalOutlined />}
          iconColor="var(--purple-color)"
          height="fit-content"
          width="auto"
        />
        <CardStateContainer
          label={t("compare_dashboard.overview.completion")}
          state={overviewObj?.completion}
          icon={<FileTextOutlined />}
          iconColor="var(--purple-color)"
          height="fit-content"
          width="auto"
        />
        <CardStateContainer
          label={t("compare_dashboard.overview.oee")}
          state={overviewObj?.oee}
          icon={<ShoppingCartOutlined />}
          iconColor="var(--purple-color)"
          height="fit-content"
          width="auto"
        />

        <Col xs={24} xl={12}>
          <Space direction="vertical" size={24} style={{ width: "100%" }}>
            <Space
              direction="horizontal"
              wrap
              size={12}
              style={{ width: "100%" }}
            >
              <Segmented
                options={["Monthly", "Yearly"]}
                value={scope}
                onChange={(val) => setScope(val)}
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              />
              {scope === "Monthly" ? (
                <Select
                  value={selectedMonth}
                  style={{ width: 150 }}
                  onChange={handleChangeMonth}
                  options={monthOptions}
                />
              ) : (
                <Select
                  value={selectedYear}
                  style={{ width: 150 }}
                  onChange={handleChangeYear}
                  options={yearOptions}
                />
              )}
              <Select
                value={product}
                placeholder="Select"
                style={{ width: 190 }}
                onChange={handleChangeProduct}
                options={productOptions}
              />
            </Space>

            <h2>Actual & Planned</h2>
            <CardContainer width={"100%"} height="auto">
              <ActualVsPlannedChart dataSource={actualVsPlanObj} />
            </CardContainer>

            <h2>Waste Product Compare</h2>
            <CardContainer width={tableWidth} height="fit-content">
              <WastProductCompareChart dataSource={wasteProductCompareObj} />
            </CardContainer>
          </Space>
        </Col>

        {/* Table */}
        <Col xs={24} xl={12}>
          <CardContainer width={tableWidth} height="fit-content">
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <Row justify="space-between" align="middle">
                <h3>Compare Product : </h3>
                <Button
                  aria-label="Download"
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
              <CompareProductTable
                dataSource={tableDataSource}
                isLoading={isLoading}
                pagination={pagination}
                // onChange ไม่จำเป็นแล้ว เพราะ hook ยิง API ให้ทุกครั้งเมื่อ state เปลี่ยน
              />
            </Space>
          </CardContainer>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default CompareDashboardComponents;
