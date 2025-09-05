import { WarningOutlined } from "@ant-design/icons";
import { Switch as AntdSwitch } from "antd";
import cx from "classnames";
import { useField } from "formik";

import styles from "./Switch.module.css";

function Switch({
  className = "",
  name = "",
  label = "",
  size = "middle",
  disabled = false,
  onChange = () => {},
}) {
  const [field, meta, helpers] = useField(name);
  const { onBlur } = field;
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (checked) => {
    setValue(checked);
    onChange(checked);
  };

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.input}>
        {label && (
          <label className={cx("label", styles.label)} htmlFor={name}>
            {label}
          </label>
        )}
        <AntdSwitch
          id={name}
          name={name}
          value={value || ""}
          onChange={handleChange}
          onBlur={onBlur}
          data-state={touched && error ? "error" : ""}
          status={touched && error ? "error" : ""}
          disabled={disabled}
          size={size}
        />
      </div>
      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
}

export default Switch;
