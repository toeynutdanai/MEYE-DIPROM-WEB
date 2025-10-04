import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Input, Row, Space, Typography } from "antd";
import { MainLayout } from "components/layouts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/Company.module.css";
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
      console.log(companyName);
      onSubmit({ companyName: companyName });
    } else if (value === "desc") {
      console.log(companyDescription);
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
          <h2>Company Detail</h2>
          <Row gutter={[20, 20]} align="stretch" style={{marginLeft: "10px", marginRight: "10px"}}>
            <Col span={7}>
              <Space direction="vertical" className={styles.container}>
                <Typography.Title level={5}>
                  {t("company.label.companyCode")}
                </Typography.Title>
                <Input value={companyCode} disabled={true} />
              </Space>
            </Col>
            <Col span={17}>
              <Space direction="vertical" className={styles.container}>
                <Typography.Title level={5}>
                  {t("company.label.companyName")}
                </Typography.Title>
                <Flex align="start" gap="small">
                  <Input
                    disabled={disableName}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    rules={[{ required: true }]}
                  />
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
                    disabled={disableName}
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
              </Space>
            </Col>

            <Col span={24}>
              <Space direction="vertical" className={styles.container}>
                <Typography.Title level={5}>
                  {t("company.label.companyDescription")}
                </Typography.Title>
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
