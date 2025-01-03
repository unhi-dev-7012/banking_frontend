import { PaginationParams } from "@constants/tableState";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import styles from "./TableComponent.module.css";

interface TableComponentProps<T> {
  columns: ColumnsType<T>;
  datasource: T[];
  pagination: PaginationParams;
  loading: boolean;
  handleTableChange: (pagination: TablePaginationConfig) => void;
  rowKey: string;
}

export default function TableComponent<T>({
  columns,
  datasource,
  pagination,
  loading,
  handleTableChange,
  rowKey,
}: TableComponentProps<T>) {
  const rowClassName = (_record: any, index: number): string => {
    return index % 2 === 1 ? styles.evenRow : styles.oddRow;
  };

  return (
    <Table<T>
      className={styles.customTable}
      bordered
      columns={columns}
      dataSource={datasource}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: false,
        position: ["bottomCenter"],
      }}
      scroll={{
        scrollToFirstRowOnChange: true,
        y: 600,
      }}
      onChange={handleTableChange}
      rowClassName={rowClassName}
      loading={loading}
      rowKey={rowKey}
    />
  );
}
