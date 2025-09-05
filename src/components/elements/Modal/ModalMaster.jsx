import cx from "classnames";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import { Col, Divider, Modal, Row, Space } from "antd";
import { Button } from "components/elements";
import SubInfoSwitch from "components/elements/InfoSwitch/SubInfoSwitch";
import { Input, Select } from "components/form";

import styles from "./Modal.module.css";

function ModalMaster({
  className = "",
  title = "",
  isModalOpen = false,
  width = 975,
  initialValues = {},
  schema = null,
  labelList = [],
  onSubmit = () => { },
  onCancel = () => { },
}) {
  const { t } = useTranslation();

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={() => {
        const cancelBtn = document.getElementById("mst__cancelBtn");
        if (cancelBtn) {
          cancelBtn.click();
        } else {
          onCancel();
        }
      }}
      className={cx(styles.customStyle, className)}
      width={width}
      footer={null}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ values = {}, setFieldValue, resetForm }) => {
          const getFieldRenderer = (field) => {
            if (field.type === "input") {
              return (
                <Input
                  name={field.name}
                  label={field.label}
                  placeholder={field.label}
                  size="large"
                />
              );
            } else if (field.type === "switch") {
              return (
                <SubInfoSwitch
                  label={field.label}
                  value={values[field.name]}
                  onChange={(val) => setFieldValue(field.name, val)}
                />
              );
            } else if (field.type === "select") {
              return (
                <Select
                  name={field.name}
                  label={field.label}
                  placeholder={field.label}
                  options={field.options}
                  size="large"
                />
              );
            }
            return <></>;
          };
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
                      name="commonTypeName"
                      label={labelList[0]}
                      placeholder={labelList[0]}
                      size="large"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="commonTypeNameEn"
                      label={labelList[1]}
                      placeholder={labelList[1]}
                      size="large"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="description"
                      label="Description (TH)"
                      placeholder="Description (TH)"
                      size="large"
                      type="textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="descriptionEn"
                      label="Description (EN)"
                      placeholder="Description (EN)"
                      size="large"
                      type="textarea"
                    />
                  </Col>
                  {labelList[2] ? (
                    <Col span={12}>{getFieldRenderer(labelList[2])}</Col>
                  ) : (
                    <></>
                  )}
                  {labelList[3] ? (
                    <Col span={12}>{getFieldRenderer(labelList[3])}</Col>
                  ) : (
                    <></>
                  )}
                </Row>
                <Row justify="end">
                  <Space direction="horizontal" size={12}>
                    <Button
                      id="mst__cancelBtn"
                      type="default"
                      onClick={() => {
                        resetForm();
                        onCancel();
                      }}
                    >
                      {t("common.cancel").toUpperCase()}
                    </Button>
                    <Button htmlType="submit">
                      {t("common.submit").toUpperCase()}
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

export default ModalMaster;
