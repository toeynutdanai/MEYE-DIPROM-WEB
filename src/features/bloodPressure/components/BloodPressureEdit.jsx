import { Col, Divider, Row, Space, Spin } from "antd";
import { Input, Select, InputNumber } from "components/form";
import { Form, Formik } from "formik";

import { useTranslation } from "react-i18next";

import { Button } from "components/elements";

import { MainLayout } from "components/layouts";
import { useNavigate } from "react-router-dom";
import schema from "../schemas/bloodPressureEditSchema";
import styles from "../styles/BloodPressureList.module.css";

const BloodPressureEdit = ({
  isLoading = false,
  bloodPressure = {},
  userDropDownNameHn = [],
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <MainLayout
      title={t("blood_pressure.edit")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("blood_pressure.header"), link: "/blood_pressure" },
      ]}
    >
      <div className={styles.container}>
        <Formik
          initialValues={{
            ...bloodPressure,
            createBy: bloodPressure?.createBy?.id,
          }}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({ setFieldValue, setTouched }) => {
            return (
              <Form>
                <Space
                  direction="vertical"
                  size={24}
                  style={{ maxWidth: "100%", width: "100%" }}
                >
                  <Row justify="end">
                    <Space size={20}>
                      <Button
                        type="secondary"
                        onClick={() => navigate("/blood_pressure")}
                      >
                        {t("common.back").toUpperCase()}
                      </Button>
                      <Button htmlType="submit" disabled={isLoading}>
                        {t("common.save").toUpperCase()}
                      </Button>
                    </Space>
                  </Row>
                  <Spin spinning={isLoading}>
                    <div className="card">
                      <Space
                        direction="vertical"
                        size={6}
                        style={{ width: "100%" }}
                      >
                        <Row gutter={[24, 16]}>
                          <Col span={24}>
                            <h1>
                              <b className={styles.infoTopic}>
                                {t(
                                  "blood_pressure.label.blood_pressure_information"
                                )}
                              </b>
                            </h1>
                          </Col>
                          <Divider />
                          <Col span={12}>
                            <h2>
                              <b className={styles.infoTopic}>
                                {t("blood_pressure.label.blood_pressure")}
                              </b>
                            </h2>
                            <Divider />
                          </Col>
                          <Col span={12}>
                            <h2>
                              <b className={styles.infoTopic}>
                                {t("blood_pressure.label.create")}
                              </b>
                            </h2>
                            <Divider />
                          </Col>
                          <Col span={12}>
                            <InputNumber
                              required={true}
                              name="systolicPressure"
                              label=<b className={styles.infoTopic}>
                                {t("blood_pressure.label.sys")}
                              </b>
                              placeholder=""
                              size="large"
                            />
                          </Col>
                          <Col span={12}>
                            <Select
                              disabled
                              required={true}
                              name="createBy"
                              label=<b className={styles.infoTopic}>
                                {t("blood_pressure.label.name")}
                              </b>
                              placeholder="Please Select"
                              size="large"
                              options={userDropDownNameHn}
                            />
                          </Col>
                          <Col span={12}>
                            <Input
                              required={true}
                              name="diastolicPressure"
                              label=<b className={styles.infoTopic}>
                                {t("blood_pressure.label.dia")}
                              </b>
                              placeholder=""
                              size="large"
                            />
                          </Col>
                          <Col span={12}></Col>
                          <Col span={12}>
                            <Input
                              required={true}
                              name="pulseRate"
                              label=<b className={styles.infoTopic}>
                                {t("blood_pressure.label.pul")}
                              </b>
                              placeholder=""
                              size="large"
                            />
                          </Col>
                        </Row>
                      </Space>
                    </div>
                  </Spin>
                </Space>
              </Form>
            );
          }}
        </Formik>
      </div>
    </MainLayout>
  );
};

export default BloodPressureEdit;
