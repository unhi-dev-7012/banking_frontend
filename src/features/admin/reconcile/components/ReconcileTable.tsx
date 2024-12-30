import TableComponent from "@components/common/Table/TableComponent";
import { Transaction, useReconcile } from "../stores/reconcileStore";
import { TablePaginationConfig } from "antd";
import { reconcileColumns } from "./reconcileColumns";
import { useEffect } from "react";

const ReconcileTable: React.FC = () => {
  const {
    bankId,
    selectedMonthStr,
    data,
    pagination,
    loading,
    fetchTableData,
    setPagination,
  } = useReconcile();

  useEffect(() => {
    fetchTableData();
  }, [pagination.current, pagination.total, bankId, selectedMonthStr]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
    });
  };

  return (
    <TableComponent<Transaction>
      datasource={data}
      pagination={pagination}
      loading={loading}
      handleTableChange={handleTableChange}
      columns={reconcileColumns}
    />
  );
};

export default ReconcileTable;
