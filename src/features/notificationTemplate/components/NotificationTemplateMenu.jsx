import { Menu as AntdMenu } from "antd";
import cx from "classnames";
import { storage } from "lib";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CalendarOutlined, CopyOutlined } from "@ant-design/icons";

import {
  NOTIFICATION_TEMPLATE_PAGE,
  NOTIFICATION_TEMPLATE_PAGE_LIST,
} from "../schemas/notificationSchema";
import styles from "../styles/NotificationTemplate.module.css";

function getItem(i18n_key, label, key, icon, children, type) {
  return {
    i18n_key,
    key,
    icon,
    children,
    label,
    type,
  };
}

const NOTIFICATION_TEMPLATE_MENU = [
  getItem(
    "email",
    "Email",
    "email",
    <CopyOutlined style={{ color: "gray" }} />
  ),
  getItem(
    "mobile_number",
    "Mobile Number",
    "mobileNumber",
    <CalendarOutlined style={{ color: "gray" }} />
  ),
];

const NotificationTemplateMenu = ({ className = "", onChange = () => { } }) => {
  const [selectedKeys, setSelectedKeys] = useState([NOTIFICATION_TEMPLATE_PAGE.EMAIL]);

  const onMenuClick = (e) => {
    const key = e.key;
    setSelectedKeys([key]);
    onChange(key);
    storage.sessionStorage.setItem("config.menu", key);
  };

  const { t } = useTranslation();

  useEffect(() => {
    const key = storage.sessionStorage.getItem("config.menu");
    if (NOTIFICATION_TEMPLATE_PAGE_LIST.includes(key)) {
      setSelectedKeys([key]);
    } else {
      setSelectedKeys([NOTIFICATION_TEMPLATE_PAGE.EMAIL]);
    }
  }, []);

  return (
    <div className={cx("card-mini", styles.container, className)}>
      <AntdMenu
        className={styles.menu}
        defaultSelectedKeys={[NOTIFICATION_TEMPLATE_PAGE.EMAIL]}
        selectedKeys={selectedKeys}
        mode="inline"
        items={NOTIFICATION_TEMPLATE_MENU.map((entity) => {
          return {
            ...entity,
            label: t(`${entity.i18n_key}.header`) || entity.label,
          };
        })}
        onClick={onMenuClick}
      />
    </div>
  );
};

export default NotificationTemplateMenu;
