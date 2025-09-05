import { Avatar, Dropdown, Modal, Space } from "antd";
import i18n from "i18n";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  GlobalOutlined,
  LockOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import EN from "components/elements/LanguageSwitcher/EN.json";
import TH from "components/elements/LanguageSwitcher/TH.json";

import { useTranslation } from "react-i18next";
import session from "utils/session";

const User = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profile = window.localStorage.getItem("name");

  const handleChange = useCallback((lng) => {
    window.localStorage.setItem("lang", lng);
    i18n.changeLanguage(lng);
  }, []);

  const odSignOut = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: "Are you sure?",
      content: <p>Are you sure logout ?</p>,
      onOk() {
        session.removeAuthToken();
        navigate("/sign_in");
      },
      okText: "CONFIRM",
      cancelText: "CANCEL",
    });
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "0",
            label: <span style={{ fontWeight: "bold" }}>{profile}</span>,
          },
          {
            key: "1",
            label: <span>{t("user.label.language")}</span>,
            icon: <GlobalOutlined />,
            children: [
              {
                key: "2.english",
                label: (
                  <Space onClick={() => handleChange("en")}>
                    <img
                      src={`data:image/png;base64, ${EN}`}
                      alt="en"
                      aria-label="en"
                      width={40}
                      height="auto"
                    />
                    ENGLISH
                  </Space>
                ),
              },
              {
                key: "2.thai",
                label: (
                  <Space onClick={() => handleChange("th")}>
                    <img
                      src={`data:image/png;base64, ${TH}`}
                      alt="th"
                      aria-label="th"
                      width={40}
                      height="auto"
                    />
                    ภาษาไทย
                  </Space>
                ),
              },
            ],
          },
          {
            key: "2",
            label: (
              <span onClick={() => navigate("/change_password")}>
                {t("user.label.change_password")}
              </span>
            ),
            icon: <LockOutlined />,
          },
          {
            key: "3",
            label: <span onClick={odSignOut}>{t("user.label.sign_out")}</span>,
            icon: <LoginOutlined />,
          },
        ],
      }}
    >
      <Avatar size={40} icon={<SettingOutlined />} />
    </Dropdown>
  );
};

export default User;
