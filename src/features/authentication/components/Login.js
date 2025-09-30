import { Flex, Layout, Modal, Row, Typography } from "antd";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import Logo from "assets/images/logo.png";
import { Button } from "components/elements";
import { Input, Password } from "components/form";
import { AuthBackground } from "components/layouts";

import { Card, Col, Image } from "antd/lib";
import { Content } from "antd/lib/layout/layout";
import { useMediaQuery } from "react-responsive";
import useLoginSchema from "../schemas/loginSchema";
import styles from "../styles/Login.module.css";

function Login({
  isLoading = false,
  handleLogin = () => {},
  handleForgotPassword = () => {},
  initialValues = null,
}) {
  const { t } = useTranslation();
  const validationSchema = useLoginSchema();
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  return (
    <AuthBackground AuthBackground>
      <Layout>
        <Content className={styles.container}>
          <Row style={isPortrait ? { width: "60%" } : {}}>
            <Col span={24} className={styles.colContainer}>
              <Image preview={false} width={"45%"} src={Logo} />

              <Card className={styles.formContainer}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {({ isValid, dirty }) => (
                    <Form
                      style={{
                        maxWidth: "100%",
                        ...(!isPortrait ? { height: "50vh" } : {})
                      }}
                    >
                      <Flex vertical gap={50}>
                        <p className={styles.formHeader}>
                          {t("sign_in.label.sign_in")}
                        </p>

                        <div>
                          <Typography.Title
                            level={5}
                            style={{ textAlign: "left" }}
                          >
                            {t("sign_in.placeholders.username")}
                          </Typography.Title>

                          <Input
                            required
                            name="username"
                            size="large"
                            type="text"
                            placeholder={`Enter Your Email`}
                            className={styles.input}
                          />
                        </div>

                        <div>
                          <Typography.Title
                            level={5}
                            style={{ textAlign: "left" }}
                          >
                            {t("sign_in.placeholders.password")}
                          </Typography.Title>

                          <Password
                            name="password"
                            size="large"
                            placeholder={`Ex. Password123!`}
                            className={styles.input}
                          />
                        </div>

                        <Row
                          align="middle"
                          justify="end"
                          style={{
                            width: "100%",
                          }}
                          direction="vertical"
                          size={20}
                        >
                          <label
                            className={styles.forgot}
                            onClick={handleForgotPassword}
                          >
                            {t("sign_in.label.forgot_password")}
                          </label>
                        </Row>

                        <Button
                          className={styles.button}
                          disabled={isLoading || !isValid || !dirty}
                          htmlType="submit"
                          size="large"
                        >
                          {t("sign_in.entity")}
                        </Button>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </AuthBackground>
  );
}

export default Login;
