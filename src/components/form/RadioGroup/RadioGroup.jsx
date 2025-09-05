import { WarningOutlined } from "@ant-design/icons";
import { Radio as AntdRadio } from "antd";
import cx from "classnames";
import { useField } from "formik";

import styles from "./RadioGroup.module.css";

function RadioGroup({
  label = "",
  name = "",
  size = "middle",
  className = "",
  required = false,
  disabled = false,
  options = [],
  onChange = () => {},
}) {
  // eslint-disable-next-line no-unused-vars
  const [_, meta, helpers] = useField(name);
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    onChange(val);
  };

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label className={cx("label", styles.label)} htmlFor={name}>
          {label}
          {required && <span className="error">*</span>}
        </label>
      )}
      <AntdRadio.Group
        id={name}
        className={styles.input}
        name={name}
        value={value || ""}
        onChange={handleChange}
        data-state={touched && error ? "error" : ""}
        status={touched && error ? "error" : ""}
        disabled={disabled}
        size={size}
      >
        {options.map((opt, idx) => (
          <AntdRadio key={idx} value={opt.value}>
            {opt.label}
          </AntdRadio>
        ))}
      </AntdRadio.Group>
      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
}

export default RadioGroup;
