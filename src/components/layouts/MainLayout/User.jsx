import { Avatar, Dropdown, Modal, Space } from "antd";
// import { ModalCustom } from "./Modal";
import i18n from "i18n";
import { useCallback ,useState} from "react";
import { useNavigate } from "react-router-dom";

import {
  GlobalOutlined,
  LockOutlined,
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { generateRandomString } from "utils/helper";
import EN from "components/elements/LanguageSwitcher/EN.json";
import TH from "components/elements/LanguageSwitcher/TH.json";
import ModalChangePassword from "components/elements/Modal/ModalChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import session from "utils/session";
import useChangePassword from "features/authentication/hooks/useChangePassword"

const User = () => {

  const {isLoading, doChangePassword, onCancel } = useChangePassword();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profile = window.localStorage.getItem("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  

  // const doChangePassword = async (values) => {
  //   try {
  //     console.log("changePassword:",values)
  //     dispatch(setIsLoading(true));
  //     const modifiedValues = {
  //       ...values,
  //       requestId: generateRandomString(),
  //     };
  //     await changePassword(modifiedValues);
  //     alert({ message: "Success" });
  //     dispatch(setIsLoading(true));
  //     window.history.back();
  //   } catch (error) {
  //     alert({ type: "error", resultObject: error });
  //   } finally {
  //     dispatch(setIsLoading(false));
  //   }
  // };

  const odChangePassword = (e) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
              <span onClick={(odChangePassword) }>
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

      <ModalChangePassword
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onSubmit={doChangePassword}
      />

    </div>

    
  );
  
};

export default User;
