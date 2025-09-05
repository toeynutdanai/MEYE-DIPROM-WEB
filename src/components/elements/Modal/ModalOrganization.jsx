import cx from "classnames";
import { Form, Formik } from "formik";

import { Button, Col, Divider, Modal, Row, Space } from "antd";
import SubInfoSwitch from "components/elements/InfoSwitch/SubInfoSwitch";
import { Input, Select } from "components/form";

import schema from "../../../features/company/schemas/companyOrganizationSchema";
import styles from "./Modal.module.css";
import { useTranslation } from "react-i18next";

function ModalOrganization({
  node = [],
  title = "",
  width = 975,
  className = "",
  back = "CANCEL",
  submit = "SAVE",
  blankForm = false,
  isCompany = false,
  isModalOpen = false,
  acountTypeOption = [],
  organizationLevelOption = [],
  organizationUnderOptions = [],
  socialSecurityBranchOptions = [],
  handleOk = () => {},
  onSubmit = () => {},
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
      onCancel={onCancel}
      className={cx(styles.customStyle, className)}
      width={width}
      footer={null}
    >
      <Formik
        enableReinitialize
        initialValues={{
          isCompany: isCompany,
          information: node.accountInformation === "Y",
          level: isCompany
            ? organizationLevelOption.find((e) => e.level === 1).value
            : parseInt(node.level),
          under: node.organizationId,
          agencyCode: blankForm ? "" : node.departmentCode,
          organizationLevelNameTH: blankForm ? "" : node.organizationName,
          organizationLevelNameEN: blankForm ? "" : node.organizationNameEn,
          costCenter: blankForm ? "" : node.costCenter,
          businessUnit: blankForm ? "" : node.businessUnit,
          accountTypeCodes: blankForm ? "" : node.accountTypeCodes,
          socialSecurityBranchOptions: blankForm
            ? ""
            : node.socialSecurityBranch,
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          onSubmit(values, onCancel);
        }}
      >
        {({ values = {}, setFieldValue = () => {}, resetForm = () => {} }) => {
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
                    <Select
                      disabled
                      name="level"
                      label={t("organization.label.level")}
                      placeholder="Level"
                      size="large"
                      options={organizationLevelOption}
                    />
                  </Col>
                  {isCompany === false ? (
                    <Col span={12}>
                      <Select
                        disabled
                        name="under"
                        label={t("organization.label.under")}
                        placeholder="Under"
                        size="large"
                        options={organizationUnderOptions}
                      />
                    </Col>
                  ) : (
                    <Col span={12}></Col>
                  )}
                  <Col span={12}>
                    <Input
                      name="agencyCode"
                      label={
                        t("organization.label.agency_code") +
                        t("common.required_field_suffix")
                      }
                      placeholder="Agency Code *"
                      size="large"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="organizationLevelNameTH"
                      label={
                        t("organization.label.name_th") +
                        t("common.required_field_suffix")
                      }
                      placeholder="Organization Level Name (TH) *"
                      size="large"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="organizationLevelNameEN"
                      label={
                        t("organization.label.name_en") +
                        t("common.required_field_suffix")
                      }
                      placeholder="Organization Level Name (EN) *"
                      size="large"
                    />
                  </Col>
                  {isCompany === false ? (
                    <Col span={12}>
                      <Select
                        name="socialSecurityBranchOptions"
                        label={t("organization.label.social_security_branch")}
                        placeholder="Select"
                        size="large"
                        options={socialSecurityBranchOptions}
                      />
                    </Col>
                  ) : (
                    <Col span={12}></Col>
                  )}
                  <Col span={12} style={{ paddingTop: "12px" }}>
                    <SubInfoSwitch
                      label={t("organization.label.account_information")}
                      subClassName={styles.label}
                      value={values.information}
                      onChange={(e) => {
                        setFieldValue("information", !values.information);
                      }}
                    />
                  </Col>
                  <Col span={12}></Col>
                  {values.information ? (
                    <Col span={24}>
                      <Row gutter={[24, 10]}>
                        <Col span={12}>
                          <Select
                            name="accountTypeCodes"
                            label={
                              t("organization.label.account_type_codes") +
                              t("common.required_field_suffix")
                            }
                            placeholder="Account Type Codes*"
                            size="large"
                            options={acountTypeOption}
                          />
                        </Col>
                        <Col span={6}>
                          <Input
                            name="costCenter"
                            label={t("organization.label.cost_center")}
                            placeholder="Cost Center"
                          />
                        </Col>
                        <Col span={6}>
                          <Input
                            name="businessUnit"
                            label={t("organization.label.business_unit")}
                            placeholder="Business Unit"
                          />
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
                <Row justify="end">
                  <Space direction="horizontal" size={12}>
                    <Button
                      id="organization__cancelBtn"
                      key="back"
                      onClick={() => {
                        handleCancel();
                        resetForm();
                      }}
                      className={styles.cancelContainer}
                    >
                      {back}
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      className={styles.cancelSave}
                    >
                      {submit}
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

export default ModalOrganization;
