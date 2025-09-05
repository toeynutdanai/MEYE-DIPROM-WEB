import { DownloadOutlined, FilterOutlined } from "@ant-design/icons";
import { Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import { MainLayout } from "components/layouts";
import BloodPressureTable from "components/table/BloodPressureTable";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "../styles/BloodPressureList.module.css";
import FilterSection from "./BloodPressureFitter";

function getResponsiveTableWidth() {
  return window.innerWidth > 1100
    ? "100%"
    : `${document.documentElement.clientWidth - 26}px`;
}

const BloodPressureList = ({
  bloodPressureList = [],
  isLoading = false,
  isDownloading = false,
  pagination = {},
  filter = {},
  onDelete = () => { },
  onChange = () => { },
  onSubmit = () => { },
  onClear = () => { },
  onDownloadExcel = () => { },
}) => {
  const { t } = useTranslation();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const userDropDownName = useSelector(
    (state) => state.bloodPressure.userDropDownName
  );
  const userDropDownHn = useSelector(
    (state) => state.bloodPressure.userDropDownHn
  );
  const [tableWidth, setTableWidth] = useState(getResponsiveTableWidth());

  useEffect(() => {
      setTableWidth(getResponsiveTableWidth());
  }, [tableWidth]);

  return (
    <MainLayout
      title={t("blood_pressure.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("blood_pressure.header"), link: "/blood_pressure" },
      ]}
    >
      <Space className={styles.container} direction="vertical" size={24}>
        <Row justify="end">
          <Space direction="horizontal" size={24}>
            <Button
              type="default"
              onClick={() => setShowFilterForm(!showFilterForm)}
            >
              {t("common.filter")} <FilterOutlined />
            </Button>
            <Button
              type="default"
              onClick={onDownloadExcel}
              loading={isDownloading}
            >
              {t("common.download")} <DownloadOutlined />
            </Button>
          </Space>
        </Row>
        <FilterSection
          showFilterForm={showFilterForm}
          onSubmit={onSubmit}
          onClear={onClear}
          userDropDownName={userDropDownName}
          userDropDownHn={userDropDownHn}
          initialValues={filter}
        />
        <CardContainer width={tableWidth} height="fit-content">
          <BloodPressureTable
            dataSource={bloodPressureList}
            onDelete={onDelete}
            isLoading={isLoading}
            pagination={pagination}
            onChange={onChange}
          />
        </CardContainer>
      </Space>
    </MainLayout>
  );
};

export default BloodPressureList;
