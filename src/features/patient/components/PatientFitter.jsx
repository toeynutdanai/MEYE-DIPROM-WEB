import { Col, Row, Slider, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import { Input, Select } from "components/form";
import { Formik, FormikConsumer } from "formik";
import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";
import schema from "../schemas/patientSchema";

const FilterSection = ({
  showFilterForm,
  onSubmit,
  onClear,
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
                  <Col xs={24} sm={12} lg={6}>
                    <Input
                      label={t("patient.label.first_name")}
                      name="firstName"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Input
                      label={t("patient.label.last_name")}
                      name="lastName"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Input
                      label={t("patient.label.email")}
                      name="email"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Input
                      label={t("patient.label.phone")}
                      name="phoneNumber"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} sm={12} lg={4}>
                    <Input
                      label={t("patient.label.hn")}
                      name="hospitalNumber"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} sm={12} lg={4}>
                    <Select
                      name="statusFlag"
                      label={t("patient.label.status")}
                      placeholder="select status..."
                      size="large"
                      options={[
                        { label: "Active", value: "ACTIVE" },
                        { label: "Inactive", value: "INACTIVE" },
                      ]}
                    />
                  </Col>
                  <Col xs={24} sm={12} lg={4}>
                    <Select
                      name="gender"
                      label={t("patient.label.gender")}
                      placeholder="select gender..."
                      size="large"
                      options={[
                        { label: "ผู้ชาย", value: "male" },
                        { label: "ผู้หญิง", value: "female" },
                      ]}
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <label>{t("patient.label.age")}</label>
                    <FormikConsumer>
                      {({ values, setFieldValue }) => (
                        <Slider
                          range
                          min={1}
                          max={100}
                          step={1}
                          value={values.age}
                          onChange={(val) => setFieldValue("age", val)}
                        />
                      )}
                    </FormikConsumer>
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
