import cx from "classnames";

import { PlusOutlined } from "@ant-design/icons";

import styles from "./ButtonCreateMini.module.css";

const ButtonCreateMini = ({ className = "", onClick = () => {} }) => {
  return (
    <button
      className={cx(className, styles.button)}
      type="button"
      onClick={onClick}
    >
      <PlusOutlined />
    </button>
  );
};

export default ButtonCreateMini;
