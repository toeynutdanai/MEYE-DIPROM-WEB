import { WarningOutlined } from "@ant-design/icons";
import { Input as AntdInput } from "antd";
import cx from "classnames";
import { Input, Select } from "components/form";
import { useField } from "formik";
import { useEffect, useState } from "react";
import styles from "./InputGroup.module.css";

const InputGroup = ({
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
  children = null,
  useTimeout = null,
}) => {
  const [timeoutId] = useState(null);
  const [meta] = useField(name);
  const { error, touched } = meta;
  // const { setValue } = helpers;

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setValue(value);
  //   if (useTimeout) {
  //     if (timeoutId) clearTimeout(timeoutId);
  //     setTimeoutId(
  //       setTimeout(() => {
  //         onChange(value);
  //       }, useTimeout)
  //     );
  //   } else {
  //     onChange(value);
  //   }
  // };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className={cx(styles.container, className)}>
      <AntdInput.Group compact>
        <Input name={name} placeholder={placeholder} />

        <Select
          name="welfare_type"
          label=""
          placeholder="select"
          size="large"
          options={[
            { label: "General", value: "general" },
            { label: "Extra Allowance", value: "extra_allowance" },

            {
              label: "Payroll Reimbursement",
              value: "payroll_reimbursement",
            },
          ]}
        />
      </AntdInput.Group>

      {touched && error && (
        <span className={cx("error", styles.error)}>
          <WarningOutlined /> {error}
        </span>
      )}
    </div>
  );
};

export default InputGroup;
