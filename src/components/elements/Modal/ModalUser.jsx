import cx from "classnames";
import { Form, Formik } from "formik";
import { Button, Col, Modal, Row, Space, Typography, Radio } from "antd";
import { Input, Select } from "components/form";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";

import styles from "./Modal.module.css";

function ModalUser({
  title = "User",
  width = 680,
  className = "",
  isModalOpen = false,
  roleOptions = [],
  companyOptions = [],
  defaultStatus = "Active",
  onSubmit = () => {},
  handleCancel = () => {},
}) {
  const { t } = useTranslation();

  return (
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

        <Formik
          enableReinitialize
          initialValues={{
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmPassword: "",
            role: "",
            company: "",
            status: defaultStatus, // "Active" | "Inactive"
          }}
          validationSchema={{}}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values, handleCancel);
            // resetForm();  // แล้วแต่ต้องการ
          }}
        >
          {({ resetForm }) => (
            <Form>
              <Space
                className={styles.container}
                size={24}
                direction="vertical"
              >
                {/* แถวชื่อผู้ใช้ */}
                <Row gutter={[24, 10]}>
                  <Col xs={24} md={12}>
                    <Input
                      name="username"
                      label={
                        <span className={styles.labelBold}>Username*</span>
                      }
                      placeholder="Username"
                      size="large"
                    />
                  </Col>
                  <Col xs={24} md={12} />
                </Row>

                {/* Firstname / Lastname */}
                <Row gutter={[24, 10]}>
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
                </Row>

                {/* Password / Confirm Password */}
                <Row gutter={[24, 10]}>
                  <Col xs={24} md={12}>
                    <Input
                      name="password"
                      type="password"
                      label={
                        <span className={styles.labelBold}>Password*</span>
                      }
                      placeholder="Password"
                      size="large"
                      suffix={<span className={styles.eyeStub} />}
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
                    />
                  </Col>
                </Row>

                {/* Role / Company */}
                <Row gutter={[24, 10]}>
                  <Col xs={24} md={12}>
                    <Select
                      name="role"
                      label={<span className={styles.labelBold}>Role*</span>}
                      placeholder="Role"
                      size="large"
                      options={roleOptions}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Select
                      name="company"
                      label={<span className={styles.labelBold}>Company*</span>}
                      placeholder="Company"
                      size="large"
                      options={companyOptions}
                    />
                  </Col>
                </Row>

                {/* Status */}
                <Row>
                  <Col xs={24} md={12}>
                    <div className={styles.statusBlock}>
                      <div className={styles.labelBold}>Status*</div>
                      <Radio.Group
                        name="status"
                        className={styles.statusGroup}
                        defaultValue={defaultStatus}
                        options={[
                          { label: "Active", value: "Active" },
                          { label: "Inactive", value: "Inactive" },
                        ]}
                      />
                    </div>
                  </Col>
                </Row>

                {/* Footer buttons */}
                <Row justify="end" className={styles.footerRow}>
                  <Space size={12}>
                    <Button
                      key="reset"
                      onClick={() => resetForm()}
                      className={styles.btnReset}
                      size="middle"
                    >
                      Reset Password
                    </Button>
                    <Button
                      htmlType="submit"
                      className={styles.btnSave}
                      size="middle"
                    >
                      Save
                    </Button>
                  </Space>
                </Row>
              </Space>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default ModalUser;
