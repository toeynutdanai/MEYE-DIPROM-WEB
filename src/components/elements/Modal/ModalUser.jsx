import cx from "classnames";
import { Form, Formik } from "formik";
import { Button, Col, Modal, Row, Space, Typography, Radio } from "antd";
import { Input, Select } from "components/form";
import { useTranslation } from "react-i18next";
import schemaAdd, {
  initialValues,
} from "../../../features/userManagement/schemas/userManagementCreateSchema";
import schemaEdit from "../../../features/userManagement/schemas/userManagementEditSchema";
import styles from "./Modal.module.css";

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
  statusModal = false,
}) {
  const { t } = useTranslation();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...initialValues,
        status: data.status ? defaultStatus : data.status,
        firstname: data.firstName,
        lastname: data.firstName,
        role: data.roleCodes,
        username: data.username,
        password: statusModal ? "*********" : null,
        confirmPassword: statusModal ? "*********" : null,
      }}
      validationSchema={statusModal ? schemaEdit : schemaAdd}
      onSubmit={onSubmit}
      validateOnChange
      validateOnBlur
    >
      {({
        resetForm,
        values,
        setFieldValue,
        validateForm,
        isSubmitting,
        isValid,
        submitForm,
        errors,
      }) => (
        <Form>
          <Modal
            title={null}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={width}
            centered
            maskClosable={false}
            rootClassName={cx(styles.modalRoot, className)}
            closeIcon={<span className={styles.closeIcon}>X</span>}
            destroyOnClose // ปิดแล้ว unmount → state ฟอร์มถูกล้าง
            afterClose={() => resetForm()} // กันค่าค้างรอบก่อน
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
                        <span className={styles.labelBold}>Username*</span>
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
                        <span className={styles.labelBold}>Firstname*</span>
                      }
                      placeholder="Firstname"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Input
                      name="lastname"
                      label={
                        <span className={styles.labelBold}>Lastname*</span>
                      }
                      placeholder="Lastname"
                      size="large"
                    />
                  </Col>

                  <Col xs={24} md={12}>
                    <Input
                      name="password"
                      type="password"
                      label={
                        <span className={styles.labelBold}>Password*</span>
                      }
                      placeholder="Password"
                      size="large"
                      disabled={statusModal}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Input
                      name="confirmPassword"
                      type="password"
                      label={
                        <span className={styles.labelBold}>
                          Confirm Password*
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
                      label={<span className={styles.labelBold}>Role*</span>}
                      placeholder="Role"
                      size="large"
                      options={roleOptions} // [{value: 'ADMIN', label:'Admin'}...]
                    />
                  </Col>

                  <Col xs={24} md={12}>
                    <div className={styles.statusBlock}>
                      <div className={styles.labelBold}>Status*</div>
                      <Radio.Group
                        name="status"
                        className={styles.statusGroup}
                        value={values.status} // ผูกกับ Formik
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
                        setFieldValue("password", "");
                        setFieldValue("confirmPassword", "");
                      }}
                      className={styles.btnReset}
                      size="middle"
                      disabled={!statusModal}
                    >
                      Reset Password
                    </Button>
                    <Button
                      htmlType="submit"
                      className={styles.btnSave}
                      size="middle"
                      disabled={isSubmitting}
                      onClick={async () => {
                        const errs = await validateForm();
                        if (Object.keys(errs).length === 0) {
                          await submitForm(); // เรียก onSubmit แน่นอน
                        }
                      }}
                    >
                      Save
                    </Button>
                  </Space>
                </Row>
              </Space>
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}

export default ModalUser;
