import { Col, Divider, Row, Space, Spin } from "antd";
import { Input } from "components/form";
import { Form, Formik } from "formik";

import { useTranslation } from "react-i18next";

import { Button } from "components/elements";

import { MainLayout } from "components/layouts";
import { useNavigate } from "react-router-dom";
import schema from "../schemas/userManagementCreateSchema";
import styles from "../styles/UserManagement.module.css";

const UserManagementCreate = ({ isLoading = false, onSubmit = () => {} }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <MainLayout
      title={t("admin.create")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("admin.header"), link: "/user_management" },
      ]}
    >
      <div className={styles.container}>
        <Formik
          initialValues={{
            password: "12345678",
          }}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({ setFieldValue, setTouched, isValid, dirty }) => {
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
                        onClick={() => navigate("/user_management")}
                      >
                        {t("common.cancel").toUpperCase()}
                      </Button>
                      <Button
                        htmlType="submit"
                        disabled={(isLoading && !isValid) || !dirty}
                      >
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
                                {t("patient.label.admin_information")}
                              </b>
                            </h1>
                          </Col>
                          <Divider />
                          <Col xs={24} md={12}>
                            <Input
                              required={true}
                              name="firstName"
                              label=<b className={styles.infoTopic}>
                                {t("patient.label.first_name")}
                              </b>
                              placeholder=""
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <Input
                              required={true}
                              name="lastName"
                              label=<b className={styles.infoTopic}>
                                {t("patient.label.last_name")}
                              </b>
                              placeholder=""
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <Input
                              required={true}
                              name="email"
                              label=<b className={styles.infoTopic}>
                                {t("patient.label.email")}
                              </b>
                              placeholder=""
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <Input
                              required={true}
                              name="phoneNumber"
                              label=<b className={styles.infoTopic}>
                                {t("patient.label.phone")}
                              </b>
                              placeholder=""
                              size="large"
                            />
                          </Col>
                          <Col xs={24}>
                            <Input
                              name="password"
                              disabled={true}
                              label=<b className={styles.infoTopic}>
                                {t("admin.label.password")}
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

export default UserManagementCreate;
