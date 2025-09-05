import { Input } from "antd";
import { Field, Form, Formik } from "formik";
import { Translation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "components/elements";
import { AuthBackground } from "components/layouts";
import schema, { initialValues } from "../schemas/ResetPasswordSchema";

import styles from "../styles/Reset.module.css";

const ResetPassword = ({ isLoading = false, doReset = () => { } }) => {
  return (
    <AuthBackground showLanguageSwitcher>
      <div className={styles.container}>
        <p className={styles.header}>
          <Translation>{(t) => t("header_reset")}</Translation>
        </p>
        <p className={styles.subHeader}>
          <Translation>{(t) => t("sub_header_reset")}</Translation>
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={doReset}
          validationSchema={schema}
        >
          {({ isValid }) => {
            return (
              <Form className={styles.formContainer}>
                <Field name="newPassword">
                  {({ field, meta }) => (
                    <div>
                      <Input.Password
                        size="large"
                        type="text"
                        placeholder="New password"
                        className={styles.input}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="newPasswordConfirm">
                  {({ field, meta }) => (
                    <div>
                      <Input.Password
                        size="large"
                        type="text"
                        placeholder="Confirm password"
                        className={styles.input}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <Button
                  className={styles.button}
                  size="large"
                  htmlType="submit"
                  disabled={isLoading || !isValid}
                >
                  <p className={styles.textbuttonConfirm}>CONFIRM</p>
                </Button>
                <Link to="/sign_in">
                  <Button
                    className={styles.buttonCancel}
                    type="default"
                    size="large"
                    htmlType="button"
                  >
                    <p className={styles.textbuttonCancel}>CANCEL</p>
                  </Button>
                </Link>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthBackground>
  );
};

export default ResetPassword;
