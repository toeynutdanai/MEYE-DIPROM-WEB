import { Button, Col, Divider, Modal, Row, Space, Upload } from "antd";
import cx from "classnames";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import uploadStyles from "components/elements/upload/Upload.module.css";
import { Select } from "components/form";

import {
  beforeUpload,
  getBase64,
  uploadButton,
} from "components/elements/upload/Upload.utils";
import { CompanySignatureSchema } from "../../../features/company/schemas/companyDocumentSchema";
import styles from "./Modal.module.css";

function ModalSignature({
  width = 510,
  className = "",
  initialValues = {},
  isModalOpen = false,
  employeeOptions = [],
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (initialValues.signature) {
      setLoading(true);
      getBase64(initialValues.signature, (url) => {
        setImageUrl(url);
      });
    }
  }, [initialValues.signature]);

  return (
    <Modal
      title={
        <b className={styles.infoTopic}>
          {initialValues.documentTypeName || "-"}
        </b>
      }
      open={isModalOpen}
      onCancel={onCancel}
      className={cx(styles.customStyle, className)}
      width={width}
      footer={null}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={CompanySignatureSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue = () => {} }) => {
          const onCoverUpload = (info) => {
            setFieldValue("signature", info.file);
            getBase64(info.file, (url) => {
              setLoading(false);
              setImageUrl(url);
            });
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
                  <Col span={24}>
                    <Select
                      name="authorized"
                      label="Authorized *"
                      placeholder="Authorized *"
                      size="large"
                      options={employeeOptions}
                      disabled
                    />
                  </Col>
                  <Col span={24}>
                    <div style={{ paddingBottom: "10px" }}>Signature *</div>
                    {imageUrl ? (
                      <div className={styles.sealContainer}>
                        <img
                          src={imageUrl}
                          alt=""
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      </div>
                    ) : (
                      <Upload
                        name="signature"
                        className={uploadStyles.containerSecond}
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={onCoverUpload}
                        action={null}
                      >
                        {uploadButton(loading)}
                      </Upload>
                    )}
                  </Col>
                </Row>
                <Row justify="end">
                  <Space direction="horizontal" size={12}>
                    <Button
                      key="back"
                      onClick={onCancel}
                      className={styles.cancelContainer}
                    >
                      {t("common.cancel").toUpperCase()}
                    </Button>
                    <Button
                      type="primary"
                      onClick={onCancel}
                      className={styles.cancelSave}
                    >
                      {t("action.submit").toUpperCase()}
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

export default ModalSignature;
