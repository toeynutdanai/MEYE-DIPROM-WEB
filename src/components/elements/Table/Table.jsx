import { Table } from "antd";

function TableAntd({ column = [{}], data = [{}] }) {
  return <Table columns={column} dataSource={data} style={{ width: "100%" }} />;
}

export default TableAntd;
