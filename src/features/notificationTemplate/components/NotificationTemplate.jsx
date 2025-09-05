import { Space } from "antd";
import { MainLayout } from "components/layouts";
import NotificationTemplateMenu from "./NotificationTemplateMenu";

import styles from "../styles/NotificationTemplate.module.css";

const NotificationTemplate = ({
  getPage = () => { },
  handleMenuChange = () => { },
}) => {
  return (
    <MainLayout
      title="Attendance"
      breadcrumb={[
        { title: "Home", link: "/" },
        { title: "Configuration" },
        { title: "Attendance Setting" },
      ]}
    >
      <Space className={styles.container} size={24} direction="vertical">
        <div className={styles.content}>
          <NotificationTemplateMenu onChange={handleMenuChange} />
          {getPage()}
        </div>
      </Space>
    </MainLayout>
  );
};

export default NotificationTemplate;
