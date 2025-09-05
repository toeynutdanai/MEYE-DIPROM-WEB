import Button from "components/elements/Button";
import styles from "../ButtonCreate/ButtonCreate.module.css";

import { PlusOutlined } from "@ant-design/icons";
function ButtonCreate({
  className = styles.buttonCreate,
  disabled = false,
  type = "primary",
  htmlType = "button",
  onClick = () => {},
}) {
  return (
    <Button className={className} size="large" onClick={onClick}>
      <div className={styles.container}>
        <p className={styles.textbuttonConfirm}>Create</p>
        <PlusOutlined />
      </div>
    </Button>
  );
}

export default ButtonCreate;
