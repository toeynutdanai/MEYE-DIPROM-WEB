import { Col } from "antd";
import styles from "./CardScoreContainer.module.css";

function CardScoreContainer({
  xs = 24,
  md = 12,
  lg = 6,
  label = "-",
  state = "-",
  unit = null,
  width = "100%",
  height = "100%",
  type = true,
}) {
  const hightAndwidth = {
    width: width,
    height: height,
  };

  return (
    <Col xs={xs} md={md} lg={lg}>
      <div className={styles.customStyle} style={hightAndwidth}>
        {type ? (
          <>
            {label && <h3 className={styles.label}>{label}</h3>}
            <h2 className={styles.value}>
              {state}
              {unit ? ` ${unit}` : ""}
            </h2>
          </>
        ) : (
          <>
            {label && <h4 className={styles.label}>{label}</h4>}
            <h3 className={styles.value}>
              {state}
              {unit ? ` ${unit}` : ""}
            </h3>
          </>
        )
        }
      </div>
    </Col>
  );
}

export default CardScoreContainer;
