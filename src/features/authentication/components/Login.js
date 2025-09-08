import { Divider, Row, Switch, Layout, Typography, Flex } from "antd";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "components/elements";
import { Input, Password } from "components/form";
import { AuthBackground } from "components/layouts";
import Logo from "assets/images/logo.png";

import useLoginSchema from "../schemas/loginSchema";
import styles from "../styles/Login.module.css";
import { Content } from "antd/lib/layout/layout";
import { Col } from "antd/lib";
import { Image } from "antd/lib";
import { Card } from "antd/lib";
import { Space } from "antd/lib";
import { useMediaQuery } from "react-responsive"


function Login({ isLoading = false, handleLogin = () => {} }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const validationSchema = useLoginSchema();
  const isPortrait = useMediaQuery({ orientation: 'portrait' })

  return (
    <AuthBackground AuthBackground >
      <Layout>
        <Content style={{
          background: 'transparent',
          justifyContent: "center",
          textAlign: "center"
        }}>
          <Row style={!isPortrait && {
            marginLeft: "35vw",
            marginRight: "35vw"
          }}>
            <Col span={24} style={{ justifyContent: "center" }}>
              <Image preview={false} width={"40%"} src={Logo} style={{
                justifyContent: "center",
                textAlign: "center",
                marginTop: 50,
                marginBottom:50
              }} />
            </Col>
      
          <Col span={24} style={{ justifyContent: "center" }}>
              
                 <Card className={styles.formContainer} styles={{ body: { padding: "0px" } }}>
                    
                    <Formik
                      initialValues={{
                        username: window.localStorage.getItem("rememberUser") || "",
                        password: "",
                        rememberMe: window.localStorage.getItem("rememberUser") ? "Y" : "N",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleLogin}
                    >
                      {({ setFieldValue, isValid, dirty }) => (
                        <Form style={{
                        // height: "50vh",
                        // maxHeight: "50vh",
                        maxWidth: "100%",
                      }} >
                          <p className={styles.formHeader}>{t("sign_in.label.sign_in")}</p>
                          
                              <Typography.Title level={5} style={{ textAlign: "left" }}>
                                {t("sign_in.placeholders.username")}
                              </Typography.Title>
                              <Flex gap={16} vertical style={{ marginTop: 20 }}>
                                  <Input
                                    required
                                    name="username"
                                    size="large"
                                    type="text"
                                    placeholder={`Username`}
                                    className={styles.input}
                              />
                              <Typography.Title level={5} style={{ textAlign: "left" }}>
                                {t("sign_in.placeholders.password")} 
                              </Typography.Title>
                                    <Password
                                      name="password"
                                      size="large"
                                      placeholder={`Ex. Password123!`}
                                      className={styles.input}
                                    />
                              </Flex>
                              
                          <Row align="middle" justify="space-between"style={{
                            marginTop: 20,
                            width: "100%",

                          }} direction="vertical" size={20}>
                            <Field name="rememberMe">
                              {({ field }) => (
                                <Row align="middle">
                                  <Switch
                                    style={{
                                      width: "10%",
                                      // height: "100%"
                                    }}
                                    id={field.name}
                                    name={field.name}
                                    onBlur={field.onBlur}
                                    onChange={(e) => {
                                      setFieldValue(field.name, e ? "Y" : "N");
                                    }}
                                    value="Y"
                                    checked={field.value === "Y"}
                                  />
                                  <label className={styles.rememberMe} htmlFor={field.name}>
                                    {t("sign_in.label.remember_me")}
                                  </label>
                                </Row>
                              )}
                            </Field>
                            <Link to="/forgot_password">{t("sign_in.label.forgot_password")}</Link>
                          </Row>
                          <Button
                            className={styles.button}
                            disabled={isLoading || !isValid || !dirty}
                            htmlType="submit"
                            size="large"
                          >
                            {t("sign_in.entity").toUpperCase()}
                          </Button>
                          {}
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
