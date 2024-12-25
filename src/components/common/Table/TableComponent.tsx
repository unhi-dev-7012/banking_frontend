import { PaginationParams } from "@constants/tableState";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import styles from "./TableComponent.module.css";

interface TableComponentProps<T> {
  columns: ColumnsType<T>;
  datasource: T[];
  pagination: PaginationParams;
  loading: boolean;
  handleTableChange: (pagination: TablePaginationConfig) => void;
}

export default function TableComponent<T>({
  columns,
  datasource,
  pagination,
  loading,
  handleTableChange,
}: TableComponentProps<T>) {
  const rowClassName = (_record: any, index: number): string => {
    return index % 2 === 1 ? styles.evenRow : styles.oddRow;
  };

  return (
    <Table<T>
      columns={columns}
      dataSource={datasource}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: false,
        position: ["bottomCenter"],
      }}
      onChange={handleTableChange}
      rowClassName={rowClassName}
      loading={loading}
    />
  );
}
