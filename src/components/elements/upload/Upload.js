import cx from "classnames";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import styles from "./Upload.module.css";

const UploadButton = ({ className = "", value = "Upload" }) => {
  return (
    <div className={cx(styles.containerSecond, className)}>
      <p className={styles.text} text>
        {value}
      </p>
      <VerticalAlignBottomOutlined className={styles.icons} />
    </div>
  );
};

export default UploadButton;
