import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Progress } from "antd";
import styles from "./CardState.module.css";

function CardState({
  width = "780px",
  color = "",
  hasDateTime,
  logo = {},
  value = "",
  label = "",
  percent = 0,
  openProgress = false,
}) {
  const hightAndWidth = {
    width: width,
    backgroundColor: color,
  };
  const { t } = useTranslation();

  return (
    <div className={styles.customStyle} style={hightAndWidth}>
      {hasDateTime ? (
        <div className={styles.header_mini}>
          <div
            className={`${styles.icon_and_text_container} ${styles.align_right}`}
          >
            {logo}
            <span className={styles.right_aligned_text}>{value}</span>
          </div>
          <div
            className={`${styles.icon_and_text_container} ${styles.align_right}`}
          >
            <span className={styles.right_aligned_text}>{label}</span>
          </div>
          {openProgress ? <Progress percent={percent} /> : "-"}
        </div>
      ) : (
        <div className={styles.header_mini}>
          {t("home.label.loading")} <LoadingOutlined />
        </div>
      )}
    </div>
  );
}

export default CardState;
