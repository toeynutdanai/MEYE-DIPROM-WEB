import { Table } from "antd";

const RoleTable = ({
  isLoading = false,
  dataSource = {},
  columns = {},
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      loading={isLoading}
      scroll={false}
      bordered={false}
      size="large"
      expandable={{
        defaultExpandAllRows: true,
        expandIcon: () => null,
      }}
    />
  );
};

export default RoleTable;
