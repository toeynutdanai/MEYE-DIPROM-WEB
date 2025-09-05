import { Modal, Button } from "antd";
import cx from "classnames";
import styles from "./Modal.module.css";

function ModalCustom({
  className = "",
  title = "",
  handleOk = () => {},
  handleCancel = () => {},
  isModalOpen = false,
  children = null,
  back = "CANCEL",
  submit = "SAVE",
  width = 975,
}) {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className={cx(styles.customStyle, className)}
      width={width}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          className={styles.cancelContainer}
        >
          {back}
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          className={styles.cancelSave}
        >
          {submit}
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default ModalCustom;
