import { Input, Row, Table } from "antd";
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
  const dataSource = [
  {
    key: '+',
    desc: 'บวก',
  },
  {
    key: '-',
    desc: 'ลบ/ขีดกลาง'
  },
  {
    key: '#',
    desc: 'แฮช/ชาร์ป',
  },
  {
    key: '<',
    desc: 'น้อยกว่า'
  },
  {
    key: '>',
    desc: 'มากกว่า',
  },
  {
    key: '=',
    desc: 'เท่ากับ'
  },
  {
    key: '@',
    desc: 'แอท',
  },
  {
    key: '_',
    desc: 'ขีดล่าง/underscore'
  },
  {
    key: '!',
    desc: 'อัศเจรีย์',
  },
  {
    key: '$',
    desc: 'Dollar Sign / ดอลลาร์ไซน์'
  },
];

const columns = [
  {
    title: 'ตัวอักษร',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'คำอธิบาย',
    dataIndex: 'desc',
    key: 'desc',
  },
];
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
                <Field name="password">
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
                <Row>
                  <p>Standard Password:</p>
                  <p>1. กำหนดให้ Password ต้องมีจำนวนตัวอักษร และอักขระพิเศษรวมกันไม่น้อยกว่า 8 ตัวอักษร</p>
                  <p>2. กำหนด Standard ของ Password ต้องประกอบด้วย</p>
                  <p>2.1. ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ อย่างน้อย 1 ตัว</p>
                  <p>2.2. ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ อย่างน้อย 1 ตัว</p>
                  <p>2.3. อักขระพิเศษ อย่างน้อย 1 ตัว โดยจะต้องเป็นอักขระพิเศษดังนี้</p>
                </Row>
                <Row>
                  <Table 
        dataSource={dataSource} 
        columns={columns} 
        showHeader={false}
        pagination={false}
        className={styles.bordered_table}
      />
                </Row>
                <Button
                  className={styles.button}
                  size="large"
                  htmlType="submit"
                  // disabled={isLoading || !isValid}
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
