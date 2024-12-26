import { message, TablePaginationConfig, Typography } from "antd";
import React, { useEffect, useState } from "react";
import EmployeeDetailTransactionModal from "../../features/transactions/components/DetailTransaction/EmployeeDetailTransactionModal";
import { useHistory } from "../../features/transactions/stores/useTransactionHistory";
import TableComponent from "../../components/common/Table/TableComponent";
import { EmployeeTransactionHistoryColumnConfig } from "../../features/transactions/components/TableTransactionColumnConfig/EmployeeTransactionColumnConfig";

const { Title } = Typography;

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
  } = useHistory();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
    });
  };

  useEffect(() => {
    fetchTransactionHistory(undefined, undefined, undefined);
    if (errorMessage) {
      message.error(errorMessage);
    }
  }, []);

  return (
    <div style={{ padding: 12, maxHeight: "100vh", overflow: "auto" }}>
      <Title level={2}>Lịch sử giao dịch</Title>

      <TableComponent<Record<string, any>>
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
