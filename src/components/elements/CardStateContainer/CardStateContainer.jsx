import { Avatar, Col, Row } from "antd";
import styles from "./CardStateContainer.module.css";

function CardStateContainer({
  xs = 24,
  md = 12,
  lg = 6,
  label = "-",
  state = "-",
  unit = null,
  width = "780px",
  color = "",
  icon = null,
  iconColor = "",
  height = "100%",
}) {
  const hightAndwidth = {
    width: width,
    height: height,
    backgroundColor: color,
  };

  return (
    <Col xs={xs} md={md} lg={lg}>
      <div className={styles.customStyle} style={hightAndwidth}>
        <Row justify="space-between" align="middle">
          <Col>
            <h4 className={styles.label}>{label}</h4>
            <h3>{state} {unit}</h3>
          </Col>
          <Col>
            <Avatar
              shape="square"
              size={42}
              icon={icon}
              style={{ backgroundColor: iconColor, borderRadius: 12 }}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default CardStateContainer;
