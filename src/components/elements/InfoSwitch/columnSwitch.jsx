import { Switch } from "antd";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";

import styles from "./InfoSwitch.module.css";

const ColumnSwitch = ({
  className = "",
  label = "-",
  value = false,
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
    <div className={cx(styles.switch, "info-switch__container", className)}>
      <label className={cx("info-switch__label", styles.labelColumn)}>
        {label}
      </label>
      <div style={{ width: "20%", marginTop: "8px" }}>
        <Switch
          className={cx("info-switch__value", styles.value)}
          value={currVal}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ColumnSwitch;
