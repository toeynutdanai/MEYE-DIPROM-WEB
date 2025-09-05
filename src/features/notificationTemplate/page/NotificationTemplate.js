import NotificationTemplateComponent from "../components/NotificationTemplate";
import useNotificationTemplate from "../hooks/useNotificationTemplate";

const NotificationTemplate = () => {
  const NotificationTemplateProps = useNotificationTemplate();
  return <NotificationTemplateComponent {...NotificationTemplateProps} />;
};

export default NotificationTemplate;
