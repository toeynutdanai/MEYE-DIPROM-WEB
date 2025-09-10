import { Avatar, Dropdown, Modal, Space } from "antd";
// import { ModalCustom } from "./Modal";
import i18n from "i18n";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  GlobalOutlined,
  LockOutlined,
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import EN from "components/elements/LanguageSwitcher/EN.json";
import TH from "components/elements/LanguageSwitcher/TH.json";

import { useTranslation } from "react-i18next";
import session from "utils/session";

const User = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profile = window.localStorage.getItem("name");
  const odSignOut = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: "Are you sure?",
      content: <p>Are you sure logout?</p>,
      onOk() {
        session.removeAuthToken();
        navigate("/sign_in");
      },
      okText: "CONFIRM",
      cancelText: "CANCEL",
    });
  };

  // const odChangePassword = (e) => {
  //   e.preventDefault();
  //   ModalCustom.confirm({
  //     title: "Are you sure?",
  //     content: <p>Are you sure logout?</p>,
  //     onOk() {
  //       session.removeAuthToken();
  //       navigate("/sign_in");
  //     },
  //     okText: "CONFIRM",
  //     cancelText: "CANCEL",
  //   });
  // };

  return (
    <div> <span style={{ fontWeight: "bold",padding: 3 }}>{profile}</span>
    <Dropdown
      menu={{
        items: [
          {
            key: "0",
            label: <span style={{ fontWeight: "bold" }}>{profile}</span>,
          },
          {
            key: "1",
            label: (
              <span onClick={() => navigate("/change_password")}>
                {t("user.label.change_password")}
              </span>
            ),
            icon: <LockOutlined />,
          },
          {
            key: "2",
            label: <span onClick={odSignOut}>{t("user.label.sign_out")}</span>,
            icon: <LoginOutlined />,
          },
        ],
      }}
    >
      <Avatar size={40} icon={<UserOutlined />} />
    </Dropdown>
    </div>
  );
  
};

export default User;
