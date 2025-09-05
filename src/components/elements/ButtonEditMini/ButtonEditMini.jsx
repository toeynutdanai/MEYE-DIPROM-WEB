import cx from "classnames";

import { EditOutlined } from "@ant-design/icons";

import styles from "./ButtonEditMini.module.css";

const ButtonEditMini = ({ className = "", onClick = () => {} }) => {
  return (
    <button
      className={cx(className, styles.button)}
      type="button"
      onClick={onClick}
    >
      <EditOutlined />
    </button>
  );
};

export default ButtonEditMini;
