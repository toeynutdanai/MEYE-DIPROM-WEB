import { Col, Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import { InputNumber, Select } from "components/form";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";
import schema from "../schemas/bloodPressureSchema";

const FilterSection = ({
  showFilterForm,
  onSubmit,
  onClear,
  userDropDownName,
  userDropDownHn,
  initialValues,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {showFilterForm && (
        <CardContainer width="100%" height="fit-content">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({ handleSubmit, resetForm }) => (
              <Form onSubmit={handleSubmit} style={{ padding: "16px" }}>
                <Row gutter={[24, 10]}>
                  <Col xs={24} sm={12}>
                    <Select
                      name="patient"
                      label={t("blood_pressure.label.createBy")}
                      placeholder="select user..."
                      size="large"
                      options={userDropDownName}
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Select
                      name="patient"
                      label={t("blood_pressure.label.createByHN")}
                      placeholder="select user..."
                      size="large"
                      options={userDropDownHn}
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <InputNumber
                      label={t("blood_pressure.label.sys")}
                      name="systolicPressure"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <InputNumber
                      label={t("blood_pressure.label.dia")}
                      name="diastolicPressure"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <InputNumber
                      label={t("blood_pressure.label.pul")}
                      name="pulseRate"
                      size="large"
                    />
                  </Col>
                  <Col xs={24}>
                    <Space direction="horizontal" size={16}>
                      <Button type="primary" htmlType="submit">
                        {t("common.confirm")}
                      </Button>
                      <Button
                        type="default"
                        onClick={() => {
                          resetForm();
                          onClear();
                        }}
                      >
                        {t("common.clear")}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardContainer>
      )}
    </>
  );
};

export default FilterSection;
