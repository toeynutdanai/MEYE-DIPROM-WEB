import cx from "classnames";

import styles from "./Info.module.css";

const Info = ({ className = "", label = "-", value = "-" }) => {
  return (
    <div className={cx(styles.container, "info__container", className)}>
      <label className={cx("info__label", styles.label)}>{label}</label>
      <p className={cx("info__value", styles.value)}>{value}</p>
    </div>
  );
};

export default Info;
