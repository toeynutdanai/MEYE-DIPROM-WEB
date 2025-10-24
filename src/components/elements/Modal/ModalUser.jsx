import {
  InfoCircleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Modal,
  Radio,
  Row,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import cx from "classnames";
import { Input, Select } from "components/form";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import schemaAdd, {
  initialValues,
} from "../../../features/userManagement/schemas/userManagementCreateSchema";
import schemaEdit from "../../../features/userManagement/schemas/userManagementEditSchema";
import styles from "./Modal.module.css";
import { useState } from "react";

function ModalUser({
  title = "User",
  width = 680,
  className = "",
  isModalOpen = false,
  roleOptions = [],
  defaultStatus = "ACTIVE", // "ACTIVE" | "INACTIVE"
  onSubmit = () => {},
  handleCancel = () => {},
  handleResetClick = () => {},
  data = {},
  statusModal = false, // true = edit mode (disable user/pass)
}) {
  const { t } = useTranslation();
  const [showPwd, setShowPwd] = useState(false);

  const keepFocus = (e) => e.preventDefault();

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
        password: statusModal ? data.password || "*********" : "",
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
              content:
                "Are you sure that you want to exit? All unsaved changes will be lost.",
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
            // message.error(
            //   t("form.fix_errors") || "Please fill in required fields."
            // );
            return;
          }
          await submitForm();
        };

        const pwdGuide = `Standard Password:
        1. กำหนดให้ Password ต้องมีจำนวนตัวอักษร และอักขระพิเศษรวมกันไม่น้อยกว่า 8 ตัวอักษร (>=8)
        2. กำหนด Standard ของ Password ต้องประกอบด้วย
          2.1 ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ อย่างน้อย 1 ตัว
          2.2 ตัวอักษรภาษาอังกฤษพิมพ์เล็ก อย่างน้อย 1 ตัว
          2.3 อักขระพิเศษ อย่างน้อย 1 ตัว โดยจะต้องเป็นอักขระพิเศษดังนี้
              + | บวก
              - | ลบ/ขีดกลาง
              # | แฮช/ชาร์ป
              < | น้อยกว่า
              > | มากกว่า
              = | เท่ากับ
              @ | แอท
              _ | ขีดล่าง/underscore
              ! | อัศเจรีย์
              $ | Dollar Sign / ดอลลาร์ไซน์
          2.4 ไม่อนุญาตให้ระบุด้วยตัวอักษรภาษาไทย`;

        const passwordLabel = (
          <span
            className={styles.labelBold}
            style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
          >
            <span>
              Password<span style={{ color: "#FF0000" }}>*</span>
            </span>
            <Tooltip
              placement="right"
              title={
                <div
                  style={{
                    whiteSpace: "break-spaces",
                    lineHeight: 1.6,
                    maxWidth: 400,
                  }}
                >
                  {pwdGuide}
                </div>
              }
            >
              <InfoCircleOutlined style={{ color: "#306CFE" }} />
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
              afterClose={() => {
                resetForm();
                setShowPwd(false);
              }}
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
                          <span className={styles.labelBold}>
                            Username<span style={{ color: "#FF0000" }}>*</span>
                          </span>
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
                          <span className={styles.labelBold}>
                            Firstname<span style={{ color: "#FF0000" }}>*</span>
                          </span>
                        }
                        placeholder="Firstname"
                        size="large"
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Input
                        name="lastname"
                        label={
                          <span className={styles.labelBold}>
                            Lastname<span style={{ color: "#FF0000" }}>*</span>
                          </span>
                        }
                        placeholder="Lastname"
                        size="large"
                      />
                    </Col>

                    <Col xs={24} md={12}>
                      <Input
                        name="password"
                        type={showPwd ? "text" : "password"}
                        label={passwordLabel}
                        placeholder="Password"
                        size="large"
                        disabled={statusModal}
                        autoComplete="new-password"
                        suffix={
                          <span
                            className={styles.eyeSuffix}
                            role="button"
                            tabIndex={0}
                            aria-label={
                              showPwd ? "Hide password" : "Show password"
                            }
                            aria-pressed={showPwd}
                            onMouseDown={keepFocus}
                            onClick={() => setShowPwd((v) => !v)}
                          >
                            {showPwd ? (
                              <EyeInvisibleOutlined />
                            ) : (
                              <EyeOutlined />
                            )}
                          </span>
                        }
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Input
                        name="confirmPassword"
                        type="password"
                        label={
                          <span className={styles.labelBold}>
                            Confirm Password
                            <span style={{ color: "#FF0000" }}>*</span>
                          </span>
                        }
                        placeholder="Confirm Password"
                        size="large"
                        disabled={statusModal}
                      />
                    </Col>

                    <Col xs={24} md={12}>
                      <Select
                        name="role"
                        label={
                          <span className={styles.labelBold}>
                            Role<span style={{ color: "#FF0000" }}>*</span>
                          </span>
                        }
                        placeholder="Role"
                        size="large"
                        options={roleOptions}
                      />
                    </Col>

                    <Col xs={24} md={12}>
                      <div className={styles.statusBlock}>
                        <div className={styles.labelBold}>
                          Status<span style={{ color: "#FF0000" }}>*</span>
                        </div>
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
                        onClick={() => handleResetClick(values.username)}
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
