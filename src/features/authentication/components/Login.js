import { Col, Divider, Row, Switch, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "components/elements";
import { Input, Password } from "components/form";
import { AuthBackground } from "components/layouts";

import useLoginSchema from "../schemas/loginSchema";
import styles from "../styles/Login.module.css";

function Login({ isLoading = false, handleLogin = () => {} }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const validationSchema = useLoginSchema();

  return (
    <AuthBackground showLanguageSwitcher>
      <div className={styles.container}>
        <p className={styles.header}>{t("sign_in.header")}</p>
        <Divider style={{ marginBottom: "35px" }} plain />
        <Formik
          initialValues={{
            email: window.localStorage.getItem("rememberUser") || "",
            password: "",
            rememberMe: window.localStorage.getItem("rememberUser") ? "Y" : "N",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ setFieldValue, isValid, dirty }) => (
            <Form className={styles.formContainer}>
              <p className={styles.formHeader}>{t("sign_in.label.sign_in")}</p>
              <Row gutter={[24, 12]}>
                <Col span={24}>
                  <Typography.Title level={5}>
                    {t("sign_in.placeholders.email")} <span className={styles.request}>*</span>
                  </Typography.Title>
                  <Input
                    required
                    name="email"
                    size="large"
                    type="text"
                    placeholder={`Ex. example@gmail.com`}
                    className={styles.input}
                  />
                </Col>
                <Col span={24}>
                  <Typography.Title level={5}>
                    {t("sign_in.placeholders.password")} <span className={styles.request}>*</span>
                  </Typography.Title>
                  <Password
                    name="password"
                    size="large"
                    placeholder={`Ex. Password123!`}
                    className={styles.input}
                  />
                </Col>
              </Row>
              <Row align="middle" justify="space-between">
                <Field name="rememberMe">
                  {({ field }) => (
                    <Row align="middle">
                      <Switch
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
              {/* <Divider style={{ margin: "0" }} plain>
                {t("common.or")}
              </Divider>
              <Button
                className={styles.button}
                type="default"
                size="large"
                htmlType="button"
                onClick={() => {
                  navigate("/sign_up")
                }}
              >
                {t("sign_up.entity").toUpperCase()}
              </Button> */}
            </Form>
          )}
        </Formik>
      </div>
    </AuthBackground>
  );
}

export default Login;
