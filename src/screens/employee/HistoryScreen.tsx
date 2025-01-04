import { message, TablePaginationConfig, Typography } from "antd";
import React, { useEffect, useState } from "react";
import EmployeeDetailTransactionModal from "../../features/transactions/components/DetailTransaction/EmployeeDetailTransactionModal";
import { useTransactionHistory } from "../../features/transactions/stores/useTransactionHistory";
import TableComponent from "../../components/common/Table/TableComponent";
import { EmployeeTransactionHistoryColumnConfig } from "../../features/transactions/components/TableTransactionColumnConfig/EmployeeTransactionColumnConfig";

const { Title, Text } = Typography;

const HistoryScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const {
    transactionHistory,
    fetchTransactionHistory,
    loading,
    errorMessage,
    pagination,
    setPagination,
  } = useTransactionHistory();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
    });
  };

  useEffect(() => {
    setPagination({ current: 1 });
  }, []);

  useEffect(() => {
    fetchTransactionHistory(undefined, undefined);
    if (errorMessage) {
      message.error(errorMessage);
    }
  }, [pagination.current]);

  return (
    <div style={{ paddingLeft: 12, maxHeight: "100vh", overflow: "auto" }}>
      <Title level={2}>Lịch sử giao dịch</Title>
      <Text style={{ color: "gray" }}>
        Lịch sử giao dịch được tính từ ngày{" "}
        {new Date(
          new Date().getTime() - 30 * 24 * 60 * 60 * 1000
        ).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </Text>

      <div style={{ marginBottom: 20 }}></div>

      <TableComponent<Record<string, any>>
        rowKey="EmployeeHistoryTable"
        datasource={transactionHistory}
        pagination={pagination}
        columns={EmployeeTransactionHistoryColumnConfig(
          setIsModalVisible,
          setSelectedTransaction
        )}
        handleTableChange={handleTableChange}
        loading={loading}
      />

      <EmployeeDetailTransactionModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        transaction={selectedTransaction}
      />
    </div>
  );
};

HistoryScreen.displayName = "HistoryScreen";

export default HistoryScreen;
