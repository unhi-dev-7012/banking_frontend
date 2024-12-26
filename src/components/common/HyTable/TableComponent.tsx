import { Table } from "antd";

interface TableProps {
  columns: any[];
  data: Record<string, any>;
  isLoading?: boolean;
}

const TableComponent: React.FC<TableProps> = ({ columns, data, isLoading }) => {
  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={data.data}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: data.metadata.page,
        total: data.metadata.totalCount,
        pageSize: 5,
      }}
      scroll={{ x: 800 }}
      rowClassName={(_: any, index) =>
        index % 2 === 0 ? "row-even" : "row-odd"
      }
    />
  );
};

export default TableComponent;
