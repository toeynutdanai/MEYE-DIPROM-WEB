import { WarningOutlined } from "@ant-design/icons";
import { InputNumber as AntdInputNumber } from "antd";
import cx from "classnames";
import { useField } from "formik";
import { useEffect, useState } from "react";

import styles from "../Input/Input.module.css";
import myStyles from "./InputNumber.module.css";

const InputNumber = ({
  label = "",
  name = "",
  placeholder = "",
  type = "text",
  size = "middle",
  min = null,
  max = null,
  prefix = null,
  suffix = null,
  onChange = () => { },
  className = "",
  required = false,
  disabled = false,
  useTimeout = null,
  step = 1,
  stringMode = false,
}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [field, meta, helpers] = useField(name);
  const { onBlur } = field;
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (val) => {
    setValue(val);
    if (useTimeout) {
      if (timeoutId) clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => {
          onChange(val);
        }, useTimeout)
      );
    } else {
      onChange(val);
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
      <AntdInputNumber
        id={name}
        className={myStyles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        min={min}
        max={max}
        prefix={prefix}
        suffix={suffix}
        onChange={handleChange}
        onBlur={onBlur}
        data-state={touched && error ? "error" : ""}
        status={touched && error ? "error" : ""}
        disabled={disabled}
        data-type={type}
        size={size}
        step={step}
        stringMode={stringMode}
      />
      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
};

export default InputNumber;
