import { Avatar, Dropdown, Modal, Space ,Row, Flex} from "antd";
import { useCallback ,useState} from "react";
import { useNavigate } from "react-router-dom";

import {
  GlobalOutlined,
  LockOutlined,
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import ModalChangePassword from "components/elements/Modal/ModalChangePassword";
import { useTranslation } from "react-i18next";
import session from "utils/session";
import useChangePassword from "features/authentication/hooks/useChangePassword"

const User = () => {

  const {isLoading, doChangePassword, onCancel } = useChangePassword();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profile = window.localStorage.getItem("name");
  const company = window.localStorage.getItem("companyCode")+" - "+window.localStorage.getItem("companyName");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const odSignOut = (e) => {
    // e.preventDefault();
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

  const odChangePassword = (e) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const handleMenuClick = (e) => {
  if(e.key === "1"){
    odChangePassword();
  }if(e.key === "2"){
    odSignOut();
  }
};

  return (
    <Row>
      {/* <div style={{ display: "flex",flexDirection: "column",lineHeight: "15px",justifyContent: "center",textAlign: "right",fontSize: "90%" ,padding: "3px 15px"}} >
      <span style={{ padding: 2 }}>{profile}</span>
      <span style={{ padding: 2 }}>{company}</span>
    </div> */}
      <Flex  align="end" vertical style={{padding: "3px 15px"}}>
      <span style={{ padding: 2 }}>{profile}</span>
      <span style={{ padding: 2 }}>{company}</span>
    </Flex>
    <div>
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
              <span >{t("user.label.change_password")}</span>
            ),
            icon: <LockOutlined />,
          },
          {
            key: "2",
            label: <span>{t("user.label.sign_out")}</span>,
            icon: <LoginOutlined />,
          },
        ],
        onClick: handleMenuClick,
      }}
    >
      <Avatar size={45} icon={<UserOutlined />} />
    </Dropdown>

      <ModalChangePassword
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onSubmit={doChangePassword}
        title={t("change_password.header")}
        width={600}
      />

    </div>
</Row>
    
  );
  
};

export default User;
