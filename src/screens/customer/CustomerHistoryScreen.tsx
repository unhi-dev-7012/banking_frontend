import React, { useEffect, useState } from "react";
import { TablePaginationConfig, Typography, message } from "antd";
import TabComponent from "../../components/common/Tab/TabComponent";
import CustomerDetailTransactionModal from "../../features/transactions/components/DetailTransaction/CustomerDetailTransactionModal";
import {
  CustomerTransactionHistoryColumnConfig,
  TransactionHistoryTabs,
} from "../../features/transactions/transactionType";
import { useHistory } from "../../features/transactions/stores/useTransactionHistory";
import { TransactionCategory } from "../../features/transactions/services/customerTransactionHistory";
import TableComponent from "../../components/common/Table/TableComponent";

const { Title } = Typography;

const CustomerHistoryScreen: React.FC = () => {
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

  const handleTabChange = (key: string) => {
    if (key === "all") {
      setPagination({ current: 1 });
      fetchTransactionHistory(undefined, undefined, undefined);
      if (errorMessage) {
        message.error(errorMessage);
      }
    } else {
      setPagination({ current: 1 });
      fetchTransactionHistory(undefined, key as TransactionCategory, undefined);
    }
  };

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

      <TabComponent
        defaultActiveKey={TransactionHistoryTabs[0]}
        onTabChange={handleTabChange}
        items={TransactionHistoryTabs}
      />

      <TableComponent<Record<string, any>>
        datasource={transactionHistory}
        pagination={pagination}
        columns={CustomerTransactionHistoryColumnConfig(
          setIsModalVisible,
          setSelectedTransaction
        )}
        handleTableChange={handleTableChange}
        loading={loading}
      />

      {selectedTransaction && (
        <CustomerDetailTransactionModal
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

CustomerHistoryScreen.displayName = "CustomerHistoryScreen";

export default CustomerHistoryScreen;
