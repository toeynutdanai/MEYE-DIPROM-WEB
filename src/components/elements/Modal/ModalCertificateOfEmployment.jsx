import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Modal, Row, Space, Upload } from "antd";
import cx from "classnames";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import uploadStyles from "components/elements/upload/Upload.module.css";
import { Select } from "components/form";

import {
  beforeUpload,
  getBase64,
  uploadButton,
} from "components/elements/upload/Upload.utils";
import { CompanySignatureSchema } from "../../../features/company/schemas/companyDocumentSchema";
import styles from "./Modal.module.css";

function ModalCertificateOfEmployment({
  width = 510,
  className = "",
  back = "CANCEL",
  submit = "SAVE",
  initialValues = {},
  isModalOpen = false,
  employeeOptions = [],
  onSubmit = () => {},
  onCancel = () => {},
}) {
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

          const onClearSignature = (e) => {
            e.stopPropagation();
            setFieldValue("signature", null);
            setLoading(false);
            setImageUrl(null);
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
                    />
                  </Col>
                  <Col span={24}>
                    <div style={{ paddingBottom: "10px" }}>Signature *</div>
                    {imageUrl ? (
                      <div className={styles.sealContainer}>
                        <MinusCircleOutlined
                          className={styles.miniMinusBtn}
                          style={{
                            position: "absolute",
                            bottom: "-12px",
                            right: "-12px",
                          }}
                          onClick={onClearSignature}
                        />
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

export default ModalCertificateOfEmployment;
