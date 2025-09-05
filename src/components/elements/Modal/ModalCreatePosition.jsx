import cx from "classnames";
import { Form, Formik } from "formik";

import { Button, Col, Divider, Modal, Row, Space } from "antd";
import { Input, Select } from "components/form";
import { useTranslation } from "react-i18next";

import schema from "../../../features/company/schemas/companyPositionSchema";
import styles from "./Modal.module.css";

function ModalCreatePosition({
  node = {},
  title = "",
  width = 975,
  className = "",
  back = "CANCEL",
  submit = "SAVE",
  blankForm = false,
  isModalOpen = false,
  modifiedPositionOptions = [],
  onSubmit = () => {},
  handleOk = () => {},
  handleCancel = () => {},
}) {
  const onCancel = () => {
    const cancelBtn = document.getElementById("organization__cancelBtn");
    if (cancelBtn) {
      cancelBtn.click();
    } else {
      handleCancel();
    }
  };

  const { t } = useTranslation();

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className={cx(styles.customStyle, className)}
      width={width}
      footer={null}
    >
      <Formik
        enableReinitialize
        initialValues={{
          positionName: blankForm ? null : node.positionName,
          positionNameEn: blankForm ? null : node.positionNameEn,
          jobDescription: blankForm ? null : node.jobDescription,
          jobSpecification: blankForm ? null : node.jobSpecification,
          under: (node.under || {}).id,
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          const obj = {
            positionId: node.positionId,
            ...values,
          };
          onSubmit(obj, onCancel);
        }}
      >
        {({ resetForm = () => {} }) => {
          return (
            <Form>
              <Space
                className={styles.container}
                size={24}
                direction="vertical"
              >
                <Divider />
                <Row gutter={[24, 10]}>
                  <Col span={12}>
                    <Input
                      name="positionName"
                      label={
                        t("position.label.name_th") +
                        t("common.required_field_suffix")
                      }
                      placeholder="Position Name (TH) *"
                      size="large"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="positionNameEn"
                      label={
                        t("position.label.name_en") +
                        t("common.required_field_suffix")
                      }
                      placeholder="Position Name (EN) *"
                      size="large"
                    />
                  </Col>

                  <Col span={12}>
                    <Input
                      name="jobDescription"
                      label={t("position.label.job_description")}
                      placeholder="Job Description"
                      size="large"
                      type="textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="jobSpecification"
                      label={t("position.label.job_specification")}
                      placeholder="Job Specification"
                      size="large"
                      type="textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <Select
                      name="under"
                      label={t("position.label.under")}
                      placeholder="Under"
                      size="large"
                      options={modifiedPositionOptions}
                    />
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row justify="end">
                  <Space direction="horizontal" size={12}>
                    <Button
                      id="position__cancelBtn"
                      key="back"
                      onClick={() => {
                        handleCancel();
                        resetForm();
                      }}
                      className={styles.cancelContainer}
                    >
                      {t("common.cancel")}
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      className={styles.cancelSave}
                    >
                      {t("common.submit")}
                    </Button>
                  </Space>
                </Row>
              </Space>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default ModalCreatePosition;
