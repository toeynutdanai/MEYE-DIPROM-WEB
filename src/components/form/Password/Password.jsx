import { WarningOutlined } from "@ant-design/icons";
import { Input as AntdInput } from "antd";
import cx from "classnames";
import { useField } from "formik";

import styles from "./Password.module.css";

const Password = ({
  label = "",
  name = "",
  placeholder = "",
  size = "middle",
  onChange = () => {},
  className = "",
  required = false,
  disabled = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const { onBlur } = field;
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    onChange(value);
  };

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label className={cx("label", styles.label)} htmlFor={name}>
          {label}
          {required && <span className="error">*</span>}
        </label>
      )}
      <AntdInput.Password
        id={name}
        className={styles.input}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={handleChange}
        onBlur={onBlur}
        data-state={touched && error ? "error" : ""}
        status={touched && error ? "error" : ""}
        disabled={disabled}
        size={size}
      />
      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
};

export default Password;
