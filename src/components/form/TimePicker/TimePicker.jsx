import { WarningOutlined } from "@ant-design/icons";
import { TimePicker as AntdTimePicker } from "antd";
import cx from "classnames";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useField } from "formik";

import styles from "./TimePicker.module.css";

dayjs.extend(customParseFormat);

function TimePicker({
  className = "",
  name = "",
  label = "",
  size = "middle",
  disabled = false,
  suffeicon = false,
  format = "HH:mm:ss",
  onChange = () => {},
}) {
  const [field, meta, helpers] = useField(name);
  const { onBlur } = field;
  const { value, error, touched } = meta;
  const { setValue } = helpers;

  const handleChange = (_, timeString) => {
    if (!timeString) {
      const toEmpty = "00:00:00";
      setValue(toEmpty);
      onChange(toEmpty);
    } else {
      setValue(timeString);
      onChange(timeString);
    }
  };

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label className={cx("label", styles.label)} htmlFor={name}>
          {label}
        </label>
      )}
      <AntdTimePicker
        id={name}
        name={name}
        value={dayjs(value, format)}
        defaultValue={dayjs("00:00:00", format)}
        format={format}
        onChange={handleChange}
        onBlur={onBlur}
        data-state={touched && error ? "error" : ""}
        status={touched && error ? "error" : ""}
        disabled={disabled}
        size={size}
        {...(suffeicon ? { suffixIcon: null } : {})}
      />
      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
}

export default TimePicker;
