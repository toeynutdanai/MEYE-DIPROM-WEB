import { Avatar, Col, Row } from "antd";
import styles from "./CardStateContainer.module.css";

function CardStateContainer({
  span = 0,
  label = "-",
  state = "-",
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
    <Col span={span}>
      <div className={styles.customStyle} style={hightAndwidth}>
        <Row justify="space-between" align="middle">
          <Col>
            <h4>{label}</h4>
            <h4>{state}</h4>
          </Col>
          <Col>
            <Avatar
              shape="square"
              icon={icon}
              style={{ backgroundColor: iconColor }}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default CardStateContainer;
