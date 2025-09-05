import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import NotificationTemplateListTable from "./NotificationTemplateListTable";

import styles from "../styles/NotificationTemplate.module.css";

const Emails = ({
  isLoading = false,
  pagination = {},
  shiftsList = [],
  onCreate = () => { },
  onStatus = () => { },
  onEdit = () => { },
  onDelete = () => { },
}) => {
  return (
    <Space className={styles.container} size={24} direction="vertical">
      <Row justify="end">
        <Space direction="horizontal" size={12}>
          <Button type="default" onClick={() => { }}>
            Filter <FilterOutlined />
          </Button>
          <Button onClick={onCreate}>
            Create <PlusOutlined />
          </Button>
        </Space>
      </Row>
      <CardContainer width="100%" height="fit-content">
        <NotificationTemplateListTable
          isLoading={isLoading}
          pagination={pagination}
          dataSource={shiftsList}
          onStatus={onStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </CardContainer>
    </Space>
  );
};

export default Emails;
