import { WarningOutlined } from "@ant-design/icons";
import { Input as AntdInput } from "antd";
import cx from "classnames";
import { useField } from "formik";
import { useEffect, useState } from "react";

import styles from "./Input.module.css";

const Input = ({
  label = "",
  name = "",
  placeholder = "",
  type = "text",
  size = "middle",
  onChange = () => {},
  className = "",
  subclassName = "",
  required = false,
  disabled = false,
  useTimeout = null,
  autoSize = false,
  autoComplete = "",
  /** ⭐️ เพิ่ม prop ใหม่ให้ส่งต่อได้ */
  prefix,
  suffix,
  allowClear,
  ...rest // เผื่อ prop อื่น ๆ ของ AntdInput
}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [field, meta, helpers] = useField(name);
  const { onBlur } = field;
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (useTimeout) {
      if (timeoutId) clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => {
          onChange(value);
        }, useTimeout)
      );
    } else {
      onChange(value);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label className={cx("label", styles.label)} htmlFor={name}>
          {label}
          {required && <span className="error">*</span>}
        </label>
      )}

      {type === "text" || type === "password" ? (
        <AntdInput
          id={name}
          className={cx(styles.input, subclassName)}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value || ""}
          onChange={handleChange}
          onBlur={onBlur}
          data-state={touched && error ? "error" : ""}
          status={touched && error ? "error" : ""}
          disabled={disabled}
          data-type={type}
          size={size}
          autoComplete={autoComplete}
          /** ⭐️ ส่งต่อให้ AntdInput */
          prefix={prefix}
          suffix={suffix}
          allowClear={allowClear}
          {...rest}
        />
      ) : (
        <AntdInput.TextArea
          rows={8}
          autoSize={autoSize}
          id={name}
          className={cx(styles.input, subclassName)}
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          onBlur={onBlur}
          data-state={touched && error ? "error" : ""}
          status={touched && error ? "error" : ""}
          disabled={disabled}
          size={size}
          autoComplete={autoComplete}
          {...rest}
        />
      )}

      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
};

export default Input;
