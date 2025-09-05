import Button from "components/elements/Button";
import styles from "../ButtonFilter/ButtonFilter.module.css";

import { FilterOutlined } from "@ant-design/icons";
function ButtonFilter({
  className = styles.buttonFilter,
  disabled = false,
  type = "primary",
  htmlType = "button",
  onClick = () => {},
}) {
  return (
    <Button className={className} size="large" onClick={onClick}>
      <div className={styles.container}>
        <p className={styles.textbuttonFilter}>Filter</p>
        <FilterOutlined className={styles.iconFilter} />
      </div>
    </Button>
  );
}

export default ButtonFilter;
