import { Col, Divider, Row, Space, Typography } from "antd";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import { Button } from "components/elements";
import { Input, Password } from "components/form";
import { AuthBackground } from "components/layouts";

import useSignUpSchema, { signUpInitialValues } from "../schemas/signUpSchema";
import styles from "../styles/SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isLoading = false, handleSignUp = () => {} }) => {
  const { t } = useTranslation();
  const validationSchema = useSignUpSchema();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/sign_in");
  };

  return (
    <AuthBackground showLanguageSwitcher>
      <div className={styles.container}>
        <p className={styles.header}>{t("sign_up.header")}</p>
        <Divider style={{ marginBottom: "35px" }} plain />
        <Formik
          initialValues={{ ...signUpInitialValues }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isValid }) => (
            <Form className={styles.formContainer}>
              <Space direction="vertical" size={12}>
                <p className={styles.formHeader}>
                  {t("sign_up.label.sign_up")}
                </p>
                <Row gutter={[24, 12]}>
                  <Col span={12}>
                    <Typography.Title level={5}>
                      {t("sign_up.input.name")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Input
                      name="name"
                      placeholder={`Ex. พยายาม`}
                      size="large"
                    />
                  </Col>
                  <Col span={12}>
                    <Typography.Title level={5}>
                      {t("sign_up.input.surName")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Input
                      name="surName"
                      placeholder={`Ex. จะจบ`}
                      size="large"
                    />
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {t("sign_up.input.email")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Input
                      name="email"
                      placeholder={`Ex. example@gmail.com`}
                      size="large"
                    />
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {t("sign_up.input.password")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Password
                      name="password"
                      placeholder={`Ex. Password123!`}
                      // size="large"
                    />
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {t("sign_up.input.phoneNo")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Input
                      name="phone"
                      placeholder={`Ex. 0812345678`}
                      size="large"
                    />
                  </Col>
                </Row>
                <div />
                <Button
                  className={styles.button}
                  htmlType="submit"
                  size="large"
                  disabled={isLoading || !isValid}
                >
                  {t("sign_up.submitBtn")}
                </Button>
                <Row justify="center">
                  <p>
                    {t("sign_up.already_account")}{" "}
                    <a
                      onClick={handleSignInClick}
                      style={{ cursor: "pointer" }}
                    >
                      {t("sign_up.sign_in")}
                    </a>
                  </p>
                </Row>
              </Space>
            </Form>
          )}
        </Formik>
      </div>
    </AuthBackground>
  );
};

export default SignUp;
