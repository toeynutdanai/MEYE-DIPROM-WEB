import cx from "classnames";
import { Form, Formik } from "formik";
import { useTranslation ,Translation} from "react-i18next";

import { Col, Divider, Modal, Row, Space,Table,Typography} from "antd";
import { Button } from "components/elements";
import SubInfoSwitch from "components/elements/InfoSwitch/SubInfoSwitch";
import { Input, Select } from "components/form";
import styles from "./Modal.module.css";

function ModalChangePassword({
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

  const dataSource = [
    { key: '+', desc: 'บวก' },
    { key: '-', desc: 'ลบ/ขีดกลาง' },
    { key: '#', desc: 'แฮช/ชาร์ป' },
    { key: '<', desc: 'น้อยกว่า' },
    { key: '>', desc: 'มากกว่า' },
    { key: '=', desc: 'เท่ากับ' },
    { key: '@', desc: 'แอท' },
    { key: '_', desc: 'ขีดล่าง/underscore' },
    { key: '!', desc: 'อัศเจรีย์' },
    { key: '$', desc: 'Dollar Sign / ดอลลาร์ไซน์' },
  ];

  const columns = [
    { title: 'ตัวอักษร', dataIndex: 'key', key: 'key' },
    { title: 'คำอธิบาย', dataIndex: 'desc', key: 'desc' },
  ];

  return (
    <Modal
      title={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className={cx(styles.customStyle, className)}
      width={width}
      footer={null}
    >
      <Formik
        enableReinitialize
        initialValues={{}}
        // validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ resetForm = () => {} }) => {
          return (
            <Form>
              <Space
                className={styles.container}
                size={24}
                direction="vertical"
              >
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
                
                <Row justify="left" gutter={[6, 10]}>
                  <Col span={12}>
                    <Input
                      name="oldPassword"
                      label={
                        t("change_password.old_password") 
                      }
                      placeholder={t("change_password.old_password")+"*"}
                      size="large"
                    />
                  </Col>
                </Row> 
                <Row justify="left" gutter={[12, 10]}>
                  <Col span={12}>
                    <Input
                      name="newPassword"
                      label={
                        t("change_password.new_password") 
                      }
                      placeholder={t("change_password.new_password")+" *"} 
                      size="large"
                    />
                  </Col>
                </Row>
                <Row justify="left" gutter={[12, 10]}>
                  <Col span={12}>
                    <Input
                      name="newPasswordConfirm"
                      label={
                        t("change_password.Confirm_password") 
                      }
                      placeholder={t("change_password.Confirm_password")+" *"} 
                      size="large"
                    />
                  </Col>
                </Row>
                
                <Row justify="left" gutter={[12, 10]}>
                  <p>&nbsp;&nbsp;Standard Password:<br />
                  &nbsp;&nbsp;1. กำหนดให้ Password ต้องมีจำนวนตัวอักษร และอักขระพิเศษรวมกันไม่น้อยกว่า 8 ตัวอักษร<br />
                  &nbsp;&nbsp;2. กำหนด Standard ของ Password ต้องประกอบด้วย<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1. ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ อย่างน้อย 1 ตัว<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.2. ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ อย่างน้อย 1 ตัว<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3. อักขระพิเศษ อย่างน้อย 1 ตัว โดยจะต้องเป็นอักขระพิเศษดังนี้</p>
                </Row> 
                <Row justify="left" gutter={[12]}> 
                  <Col span={12}>
                      <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    showHeader={false}
                    pagination={false}
                    size="small"
                    rowHover={false}
                    className={styles.bordered_table}
                  />
                  </Col>                  
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
                      {t("common.confirm")}
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

export default ModalChangePassword;
