import { WarningOutlined } from "@ant-design/icons";
import { DatePicker as AntdDatePicker } from "antd";
import cx from "classnames";
import { useField } from "formik";

import styles from "./DatePicker.module.css";

function DatePicker({
  label = "",
  name = "",
  placeholder = "",
  type = "text",
  size = "middle",
  className = "",
  required = false,
  disabled = false,
  format = null,
  onChange = () => {},
}) {
  const [field, meta, helpers] = useField(name);
  const { onBlur } = field;
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (date) => {
    setValue(date);
    onChange(date);
  };

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label className={cx("label", styles.label)} htmlFor={name}>
          {label}
          {required && <span className="error">*</span>}
        </label>
      )}
      <AntdDatePicker
        id={name}
        className={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        format={format}
        onChange={handleChange}
        onBlur={onBlur}
        data-state={touched && error ? "error" : ""}
        status={touched && error ? "error" : ""}
        disabled={disabled}
        data-type={type}
        size={size}
      />
      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
}

export default DatePicker;
