import React from "react";
import { Debt } from "../debtType";
import { TablePaginationConfig } from "antd";
import TableComponent from "@components/common/Table/TableComponent";
import { useDebtStore } from "../stores/debtStore";
import getDebtColumns from "./debtTableColumn";

interface DebtListUIProps {
  debts: Debt[];
  activeTab: string;
  onCancel: (debtId: string) => void;
  onPay: (debtId: string) => void;
  onView: (debtId: string) => void;
}

const DebtList: React.FC<DebtListUIProps> = ({
  debts,
  activeTab,
  onCancel,
  onPay,
  onView,
}) => {
  const { pagination, setPagination } = useDebtStore();
  const columns = getDebtColumns(activeTab, onCancel, onPay, onView);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
    });
  };
  return (
    <TableComponent
      columns={columns}
      datasource={debts.map((debt, index) => ({
        ...debt,
        id: debt.id || `temp-${index}`,
      }))}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      loading={false}
      handleTableChange={handleTableChange}
    />
  );
};

export default DebtList;
