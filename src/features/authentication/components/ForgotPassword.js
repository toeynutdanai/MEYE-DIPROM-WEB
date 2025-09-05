import { Col, Space, Typography } from "antd";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import { Button } from "components/elements";
import { Input, Password } from "components/form";
import { AuthBackground } from "components/layouts";

import useForgotPasswordSchema from "../schemas/ForgotPasswordSchema";
import styles from "../styles/Forgot.module.css";

const ForgotPassword = ({
  isLoading = false,
  onCancel = () => {},
  doForgotPassword = () => {},
}) => {
  const { t } = useTranslation();
  const validationSchema = useForgotPasswordSchema();

  return (
    <AuthBackground showLanguageSwitcher>
      <div className={styles.container}>
        <Formik
          initialValues={{
            email: "",
            phone: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={doForgotPassword}
          validationSchema={validationSchema}
        >
          {({ isValid, dirty }) => (
            <>
            
              <Form className={styles.formContainer}>
                <p className={styles.header}>{t("header_forgot")}</p>
                <Space direction="vertical" size={24}>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {t("sign_in.placeholders.email")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Input
                      name="email"
                      size="large"
                      type="text"
                      placeholder={`Ex. example@gmail.com`}
                      className={styles.input}
                    />
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {t("sign_up.input.phoneNo")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Input
                      name="phoneNumber"
                      size="large"
                      type="text"
                      placeholder={`Ex. 0812345678`}
                      className={styles.input}
                    />
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {t("sign_in.placeholders.newPassword")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Password
                      name="newPassword"
                      type="password"
                      placeholder={`Ex. Password123!`}
                      className={styles.input}
                    />
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {t("sign_in.placeholders.confirm_password")}{" "}
                      <span className={styles.request}>*</span>
                    </Typography.Title>
                    <Password
                      name="confirmPassword"
                      type="password"
                      placeholder={`Ex. Password123!`}
                      className={styles.input}
                    />
                  </Col>
                  <Col span={24}>
                    <Button
                      className={styles.button}
                      size="large"
                      htmlType="submit"
                      disabled={!isValid || isLoading || !dirty}
                    >
                      <p className={styles.textbuttonConfirm}>
                        {t("common.confirm")}
                      </p>
                    </Button>
                  </Col>
                  <Col span={24}>
                    <Button
                      className={styles.buttonCancel}
                      onClick={onCancel}
                      type="default"
                      size="large"
                      htmlType="button"
                    >
                      <p className={styles.textbuttonCancel}>
                        {t("common.cancel")}
                      </p>
                    </Button>
                  </Col>
                </Space>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </AuthBackground>
  );
};

export default ForgotPassword;
