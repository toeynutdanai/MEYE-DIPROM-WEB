import { Input } from "antd";
import { Field, Form, Formik } from "formik";
import { Translation } from "react-i18next";

import { Button } from "components/elements";
import { AuthBackground } from "components/layouts";
import schema, { initialValues } from "../schemas/changePasswordSchema";

import styles from "../styles/ChangePassword.module.css";

const ChangePassword = ({
  isLoading = false,
  doChangePassword = () => {},
  onCancel = () => {},
}) => {
  return (
    <AuthBackground showLanguageSwitcher>
      <div className={styles.container}>
        <p className={styles.header}>
          <Translation>{(t) => t("change_password.header")}</Translation>
        </p>
        <p className={styles.subHeader}>
          <Translation>{(t) => t("change_password.sub_Header")}</Translation>
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={doChangePassword}
          validationSchema={schema}
        >
          {({ isValid }) => {
            return (
              <Form className={styles.formContainer}>
                <Field name="oldPassword">
                  {({ field, meta }) => (
                    <div>
                      <Input.Password
                        size="large"
                        type="text"
                        placeholder="Old password"
                        className={styles.input}
                        status={meta.touched && meta.error ? "error" : ""}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="newPassword">
                  {({ field, meta }) => (
                    <div>
                      <Input.Password
                        size="large"
                        type="text"
                        placeholder="New password"
                        className={styles.input}
                        status={meta.touched && meta.error ? "error" : ""}
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
                        status={meta.touched && meta.error ? "error" : ""}
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
                <Button
                  className={styles.buttonCancel}
                  type="default"
                  size="large"
                  htmlType="button"
                  onClick={onCancel}
                >
                  <p className={styles.textbuttonCancel}>CANCEL</p>
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthBackground>
  );
};

export default ChangePassword;
