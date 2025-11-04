import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Input, Row, Space, Typography } from "antd";
import { MainLayout } from "components/layouts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/Company.module.css";
import schemaEdit from "../schemas/companySchema";
import { Form, Formik } from "formik";
const { TextArea } = Input;

const CompanyComponents = ({ companyObj = {}, onSubmit = () => {} }) => {
  const { t } = useTranslation();

  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [disableName, setDisableName] = useState(true);
  const [disableDesc, setDisableDesc] = useState(true);

  useEffect(() => {
    setCompanyCode(companyObj.companyCode);
    setCompanyName(companyObj.companyName);
    setCompanyDescription(companyObj.companyDescription);
    setDisableName(true);
    setDisableDesc(true);
  }, [companyObj]);

  useEffect(() => {
    if (disableName) {
      setCompanyName(companyObj.companyName);
    }
    if (disableDesc) {
      setCompanyDescription(companyObj.companyDescription);
    }
  }, [disableName, disableDesc]);

  const handleSave = (value) => {
    if (value === "name") {
      onSubmit({ companyName: companyName });
    } else if (value === "desc") {
      onSubmit({ companyDescription: companyDescription });
    }
  };

  return (
    <MainLayout
      title={t("company.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("company.header") },
      ]}
    >
      <Card className={styles.container}>
        <Space className={styles.container} direction="vertical" size={24}>
          <h3>Company Detail</h3>
          <Row gutter={[20, 20]} align="stretch" style={{marginLeft: "10px", marginRight: "10px"}}>
            <Col span={7}>
              <Space direction="vertical" className={styles.container}>
                <label>{t("company.label.companyCode")}</label>
                <Input value={companyCode} disabled={true} />
              </Space>
            </Col>
            <Col span={17}>
              <Space direction="vertical" className={styles.container}>
                <label>{t("company.label.companyName")} <span style={{ color: "#FF0000" }}>*</span></label>

                <Formik
                enableReinitialize
                  initialValues={{
                    companyName: companyName || "",
                  }}
                  validationSchema={schemaEdit}
                  onSubmit={(values) => {
                    handleSave("name", values.companyName);
                  }}
                >{({ values, errors, touched, handleChange, isValid }) => (
                  <Flex align="start" gap="small">
                      <Input
                        name="companyName"
                        disabled={disableName}
                        // value={companyName}
                        value={values.companyName}
                        // onChange={(e) => setCompanyName(e.target.value)}
                        rules={[{ required: true }]}
                        onChange={(e) => {
                          handleChange(e);
                          setCompanyName(e.target.value);
                        }}
                        status={errors.companyName && touched.companyName ? "error" : ""}
                      />
                      {errors.companyName && touched.companyName && (
                        <Typography.Text type="danger">
                          {errors.companyName}
                        </Typography.Text>
                      )}
                    <Button
                      icon={<EditOutlined />}
                      disabled={!disableName}
                      onClick={() =>
                        setDisableName((disableName) => !disableName)
                      }
                    />
                    <Button
                      icon={<CheckOutlined />}
                      className={styles.buttonSave}
                      disabled={disableName || !isValid}
                      onClick={() => handleSave("name")}
                      htmlType="submit"
                    />
                    <Button
                      icon={<CloseOutlined />}
                      className={styles.buttonCancel}
                      disabled={disableName}
                      onClick={() =>
                        setDisableName((disableName) => !disableName)
                      }
                    />
                  </Flex>
                )}
                </Formik>

              </Space>
            </Col>

            <Col span={24}>
              <Space direction="vertical" className={styles.container}>
                <label>{t("company.label.companyDescription")}</label>
                <Flex gap="small" align="start">
                  <TextArea
                    rows={5}
                    disabled={disableDesc}
                    value={companyDescription}
                    placeholder="maxLength is 100"
                    maxLength={100}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                  />

                  <Button
                    icon={<EditOutlined />}
                    disabled={!disableDesc}
                    onClick={() =>
                      setDisableDesc((disableDesc) => !disableDesc)
                    }
                  />
                  <Button
                    icon={<CheckOutlined />}
                    className={styles.buttonSave}
                    disabled={disableDesc}
                    onClick={() => handleSave("desc")}
                  />
                  <Button
                    icon={<CloseOutlined />}
                    className={styles.buttonCancel}
                    disabled={disableDesc}
                    onClick={() =>
                      setDisableDesc((disableDesc) => !disableDesc)
                    }
                  />
                </Flex>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>
    </MainLayout>
  );
};

export default CompanyComponents;
