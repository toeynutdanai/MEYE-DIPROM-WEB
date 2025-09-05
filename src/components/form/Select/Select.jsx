import { WarningOutlined } from "@ant-design/icons";
import { Select as AntdSelect } from "antd";
import cx from "classnames";
import { useField } from "formik";

import { DownOutlined } from "@ant-design/icons";

import styles from "../Input/Input.module.css";
import myStyles from "./Select.module.css";

const Select = ({
  label = "",
  name = "",
  placeholder = "",
  type = "text",
  size = "middle",
  className = "",
  mode = "",
  required = false,
  disabled = false,
  options = [],
  tagRender = null,
  suffixIcon = <DownOutlined />,
  onChange = () => {},
}) => {
  const [field, meta, helpers] = useField(name);
  const { onBlur } = field;
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (val, rest) => {
    setValue(val);
    onChange(val, rest);
  };

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label className={cx("label", styles.label)} htmlFor={name}>
          {label}
          {required && <span className="error">*</span>}
        </label>
      )}
      <AntdSelect
        showSearch
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        id={name}
        className={myStyles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        data-state={touched && error ? "error" : ""}
        status={touched && error ? "error" : ""}
        disabled={disabled}
        data-type={type}
        mode={mode}
        tagRender={tagRender}
        size={size}
        options={options}
        suffixIcon={suffixIcon}
      />
      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
};

export default Select;
