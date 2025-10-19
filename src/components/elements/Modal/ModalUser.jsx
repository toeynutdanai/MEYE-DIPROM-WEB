import cx from "classnames";
import { Form, Formik } from "formik";
import {
  Button,
  Col,
  Modal,
  Row,
  Space,
  Typography,
  Radio,
  Tooltip,
  message,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Input, Select } from "components/form";
import { useTranslation } from "react-i18next";
import schemaAdd, {
  initialValues,
} from "../../../features/userManagement/schemas/userManagementCreateSchema";
import schemaEdit from "../../../features/userManagement/schemas/userManagementEditSchema";
import styles from "./Modal.module.css";

const DEFAULT_RESET_PASSWORD = "P@ssw0rd#meye_c001";

function ModalUser({
  title = "User",
  width = 680,
  className = "",
  isModalOpen = false,
  roleOptions = [],
  defaultStatus = "ACTIVE", // "ACTIVE" | "INACTIVE"
  onSubmit = () => {},
  handleCancel = () => {},
  data = {},
  statusModal = false, // true = edit mode (disable user/pass)
}) {
  const { t } = useTranslation();

  return (
    <Formik
      enableReinitialize
      validateOnChange
      validateOnBlur
      validateOnMount
      initialValues={{
        ...initialValues,
        // ถ้า data.status เป็น null/undefined ให้ใช้ defaultStatus (ACTIVE)
        status: data.status ?? defaultStatus,
        firstname: data.firstName ?? "",
        lastname: data.lastName ?? "",
        role: data.roleCodes ?? undefined,
        username: data.username ?? "",
        password: statusModal ? "*********" : "",
        confirmPassword: statusModal ? "*********" : "",
      }}
      validationSchema={statusModal ? schemaEdit : schemaAdd}
      onSubmit={onSubmit}
    >
      {({
        resetForm,
        values,
        setFieldValue,
        validateForm,
        isSubmitting,
        submitForm,
        errors,
        setTouched,
        dirty,
      }) => {
        // ปิด modal พร้อม confirm ถ้ามีการแก้ไข
        const confirmClose = () => {
          if (dirty) {
            Modal.confirm({
              title: "Are you sure?",
              content: "Are you sure that you want to exit? All unsaved changes will be lost.",
              okText: "Confirm",
              cancelText: "Cancel",
              onOk: () => {
                resetForm();
                handleCancel();
              },
            });
          } else {
            resetForm();
            handleCancel();
          }
        };

        const handleSaveClick = async () => {
          const errs = await validateForm();
          if (Object.keys(errs).length > 0) {
            const touchedAll = Object.keys(errs).reduce((acc, key) => {
              acc[key] = true;
              return acc;
            }, {});
            setTouched(touchedAll, true);
            message.error(
              t("form.fix_errors") || "Please fill in required fields."
            );
            return;
          }
          await submitForm();
        };

        const passwordLabel = (
          <span
            className={styles.labelBold}
            style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
          >
            Password<span style={{color:"#FF0000"}}>*</span>
            <Tooltip
              placement="right"
              title={
                <p>
                  &nbsp;&nbsp;Standard Password:
                  <br />
                  &nbsp;&nbsp;1. กำหนดให้ Password ต้องมีจำนวนตัวอักษร
                  และอักขระพิเศษรวมกันไม่น้อยกว่า 8 ตัวอักษร
                  <br />
                  &nbsp;&nbsp;2. กำหนด Standard ของ Password ต้องประกอบด้วย
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1. ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่
                  อย่างน้อย 1 ตัว
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.2. ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่
                  อย่างน้อย 1 ตัว
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3. อักขระพิเศษ อย่างน้อย 1 ตัว
                  โดยจะต้องเป็นอักขระพิเศษดังนี้
                </p>
              }
            >
              <InfoCircleOutlined style={{color: "#306CFE"}} />
            </Tooltip>
          </span>
        );

        return (
          <Form>
            <Modal
              title={null}
              open={isModalOpen}
              onCancel={confirmClose}
              footer={null}
              width={width}
              centered
              maskClosable={false}
              rootClassName={cx(styles.modalRoot, className)}
              closeIcon={<span className={styles.closeIcon}>X</span>}
              destroyOnClose
              afterClose={() => resetForm()}
            >
              <div className={styles.card}>
                {/* Header */}
                <Row
                  justify="space-between"
                  align="middle"
                  className={styles.headerRow}
                >
                  <Col>
                    <Typography.Title level={4} className={styles.infoTopic}>
                      {title}
                    </Typography.Title>
                  </Col>
                  <Col />
                </Row>

                <Space
                  className={styles.container}
                  size={24}
                  direction="vertical"
                >
                  {/* แถวข้อมูล */}
                  <Row gutter={[24, 10]}>
                    <Col xs={24} md={12}>
                      <Input
                        name="username"
                        label={
                          <span className={styles.labelBold}>Username<span style={{color:"#FF0000"}}>*</span></span>
                        }
                        placeholder="Username"
                        size="large"
                        disabled={statusModal}
                      />
                    </Col>
                    <Col xs={24} md={12} />

                    <Col xs={24} md={12}>
                      <Input
                        name="firstname"
                        label={
                          <span className={styles.labelBold}>Firstname<span style={{color:"#FF0000"}}>*</span></span>
                        }
                        placeholder="Firstname"
                        size="large"
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Input
                        name="lastname"
                        label={
                          <span className={styles.labelBold}>Lastname<span style={{color:"#FF0000"}}>*</span></span>
                        }
                        placeholder="Lastname"
                        size="large"
                      />
                    </Col>

                    <Col xs={24} md={12}>
                      <Input
                        name="password"
                        type="password"
                        label={passwordLabel}
                        placeholder="Password"
                        size="large"
                        disabled={statusModal}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Input
                        name="confirmPassword"
                        type="password"
                        label={<span className={styles.labelBold}>Confirm Password<span style={{color:"#FF0000"}}>*</span></span>}
                        placeholder="Confirm Password"
                        size="large"
                        disabled={statusModal}
                      />
                    </Col>

                    <Col xs={24} md={12}>
                      <Select
                        name="role"
                        label={<span className={styles.labelBold}>Role<span style={{color:"#FF0000"}}>*</span></span>}
                        placeholder="Role"
                        size="large"
                        options={roleOptions}
                      />
                    </Col>

                    <Col xs={24} md={12}>
                      <div className={styles.statusBlock}>
                        <div className={styles.labelBold}>Status<span style={{color:"#FF0000"}}>*</span></div>
                        <Radio.Group
                          name="status"
                          className={styles.statusGroup}
                          value={values.status}
                          onChange={(e) =>
                            setFieldValue("status", e.target.value)
                          }
                          options={[
                            { label: "Active", value: "ACTIVE" },
                            { label: "Inactive", value: "INACTIVE" },
                          ]}
                        />
                      </div>
                    </Col>
                  </Row>

                  {/* Footer buttons */}
                  <Row justify="end" className={styles.footerRow}>
                    <Space size={12}>
                      <Button
                        key="resetPasswordOnly"
                        onClick={() => {
                          // ใส่รหัสรีเซ็ตใหม่เข้าไปทั้งสองช่อง (ให้เห็นทันที)
                          setFieldValue("password", DEFAULT_RESET_PASSWORD);
                          setFieldValue(
                            "confirmPassword",
                            DEFAULT_RESET_PASSWORD
                          );
                          message.success(
                            t("password.reset_ok") || "Password has been reset."
                          );
                        }}
                        className={styles.btnReset}
                        size="middle"
                        disabled={!statusModal}
                      >
                        Reset Password
                      </Button>
                      <Button
                        htmlType="button"
                        className={styles.btnSave}
                        size="middle"
                        loading={isSubmitting}
                        onClick={handleSaveClick}
                      >
                        Save
                      </Button>
                    </Space>
                  </Row>
                </Space>
              </div>
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ModalUser;
