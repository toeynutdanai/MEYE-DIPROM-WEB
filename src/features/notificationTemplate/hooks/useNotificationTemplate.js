import { storage } from "lib";
import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import Emails from "../page/EmailsList";
import MobileNumbers from "../components/MobileNumbers";
import {
  NOTIFICATION_TEMPLATE_PAGE,
  NOTIFICATION_TEMPLATE_PAGE_LIST,
} from "../schemas/notificationSchema";

function useNotificationTemplate() {
  const [selectedMenu, setMenu] = useState(NOTIFICATION_TEMPLATE_PAGE.EMAIL);
  // const navigate = useNavigate();

  const getPage = useCallback(() => {
    switch (selectedMenu) {
      case NOTIFICATION_TEMPLATE_PAGE.EMAIL:
        return <Emails />;
      case NOTIFICATION_TEMPLATE_PAGE.MOBILE_NUMBER:
        return <MobileNumbers />;
      default:
        return <div />;
    }
  }, [selectedMenu]);

  const handleMenuChange = useCallback(
    (e) => {
      setMenu(e);
    },
    [setMenu]
  );

  const getEditModal = useCallback(() => {
    switch (selectedMenu) {
      case "working":
        return <></>;
      case "holiday":
        return <></>;
      case "leave":
        return <></>;
      case "workFlow":
        return <></>;

      default:
        return <div />;
    }
  }, [selectedMenu]);

  useEffect(() => {
    const key = storage.sessionStorage.getItem("config.menu");
    if (NOTIFICATION_TEMPLATE_PAGE_LIST.includes(key)) {
      setMenu(key);
    } else {
      setMenu(NOTIFICATION_TEMPLATE_PAGE.WORKING);
    }
  }, []);

  return {
    selectedMenu,
    getPage,
    getEditModal,
    handleMenuChange,
    setMenu,
  };
}

export default useNotificationTemplate;
