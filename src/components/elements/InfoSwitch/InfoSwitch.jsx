import { Switch } from "antd";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";

import styles from "./InfoSwitch.module.css";

const InfoSwitch = ({
  className = "",
  label = "-",
  value = false,
  disabled = false,
  onChange = () => {},
}) => {
  const [currVal, setCurrVal] = useState(false);

  const handleChange = useCallback(
    (checked) => {
      setCurrVal(checked);
      onChange(checked);
    },
    [onChange]
  );

  useEffect(() => {
    setCurrVal(value);
  }, [value]);

  return (
    <div className={cx(styles.container, "info-switch__container", className)}>
      <label className={cx("info-switch__label", styles.label)}>{label}</label>
      <Switch
        className={cx("info-switch__value", styles.value)}
        value={currVal}
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
};

export default InfoSwitch;
