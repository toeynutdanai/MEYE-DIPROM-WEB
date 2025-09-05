import { BellFilled } from "@ant-design/icons";
import { Avatar, Badge, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "./Notification.module.css"; // นำเข้าไฟล์ CSS สำหรับการปรับแต่ง

const Notification = () => {
  const { t } = useTranslation();
  const states = useSelector((state) => state.home.states);

  const items = [
    {
      key: "0",
      label: (
        <span className={styles.notificationText}> {/* กำหนด class สำหรับปรับแต่ง */}
          {t("home.label.card_four")} : {states.userUnsent}
        </span>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <span className={styles.notificationText}> {/* กำหนด class สำหรับปรับแต่ง */}
          {t("home.label.card_five")} : {states.userWarning}
        </span>
      ),
    },
  ];

  return (
    <Dropdown placement="bottomRight" menu={{ items }}>
      <Badge count={states.userUnsent + states.userWarning} showZero offset={[1, 10]}>
        <Avatar shape="circle" size="large" icon={<BellFilled />} />
      </Badge>
    </Dropdown>
  );
};

export default Notification;
