import { Button, Col, Divider, Modal, Row, Space } from "antd";
import cx from "classnames";
import { FieldArray, Form, Formik } from "formik";
import React from "react";

import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Input } from "components/form";

import schema from "features/company/schemas/companyModalLevelSchema";
import styles from "./Modal.module.css";
import { useTranslation } from "react-i18next";

function ModalLevel({
  title = "",
  width = 975,
  className = "",
  back = "CANCEL",
  submit = "SAVE",
  isModalOpen = false,
  organizationLevelOption = [],
  onSubmit = () => {},
  handleOk = () => {},
  handleCancel = () => {},
}) {
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
          Information: false,
          organization: organizationLevelOption,
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ values = {} }) => {
          return (
            <Form>
              <Space
                className={styles.container}
                size={24}
                direction="vertical"
              >
                <Divider />
                <Row gutter={[24, 10]}>
                  <FieldArray
                    name="organization"
                    render={(arrayHelpers) =>
                      values.organization.map((_, index) => (
                        <React.Fragment key={index}>
                          <Col span={12}>
                            <Input
                              name={`organization[${index}].organizationLevelNameEn`}
                              label={`${t("organization_level.label.level")} ${
                                index + 1
                              } (${t("organization_level.label.en")})`}
                              placeholder={`${t(
                                "organization_level.label.level"
                              )} ${index + 1} (${t(
                                "organization_level.label.en"
                              )})`}
                              size="large"
                            />
                          </Col>
                          <Col span={10}>
                            <Input
                              name={`organization[${index}].organizationLevelName`}
                              label={`${t("organization_level.label.level")} ${
                                index + 1
                              } (${t("organization_level.label.th")})`}
                              placeholder={`${t(
                                "organization_level.label.level"
                              )} ${index + 1} (${t(
                                "organization_level.label.th"
                              )})`}
                              size="large"
                            />
                          </Col>
                          <Col
                            style={{ paddingTop: "25px", paddingLeft: "0px" }}
                          >
                            <Col>
                              {values.organization.length - 1 === index &&
                                index !== 9 && (
                                  <PlusCircleOutlined
                                    className={styles.miniplusBtn}
                                    onClick={() => {
                                      arrayHelpers.insert(index + 1, {
                                        organizationLevelName: null,
                                        organizationLevelNameEn: null,
                                        organizationLevelId: null,
                                        level: `${index + 2}`,
                                      });
                                    }}
                                  />
                                )}
                            </Col>
                            <Col>
                              {index > 1 && (
                                <MinusCircleOutlined
                                  className={styles.miniMinusBtn}
                                  onClick={() => arrayHelpers.remove(index)}
                                />
                              )}
                            </Col>
                          </Col>
                        </React.Fragment>
                      ))
                    }
                  />
                </Row>
                <Row justify="end">
                  <Space direction="horizontal" size={12}>
                    <Button
                      key="back"
                      onClick={handleCancel}
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

export default ModalLevel;
