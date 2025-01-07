import React, { useEffect, useState } from "react";
import { TablePaginationConfig, Typography, message } from "antd";
import TabComponent from "../../components/common/Tab/TabComponent";
import CustomerDetailTransactionModal from "../../features/transactions/components/DetailTransaction/CustomerDetailTransactionModal";
import { TransactionHistoryTabs } from "../../features/transactions/transactionType";
import { useTransactionHistory } from "../../features/transactions/stores/useTransactionHistory";
import { TransactionCategory } from "../../features/transactions/services/transactionHistory";
import TableComponent from "../../components/common/Table/TableComponent";
import { CustomerTransactionHistoryColumnConfig } from "../../features/transactions/components/TableTransactionColumnConfig/CustomerTransactionColumnConfig";

const { Title, Text } = Typography;

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
    category,
    setCategory,
  } = useTransactionHistory();

  const handleTabChange = (key: string) => {
    setPagination({ current: 1 });
    if (key === "all") {
      setCategory(undefined);
      if (errorMessage) {
        message.error(errorMessage);
      }
    } else {
      setCategory(key as TransactionCategory);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
    });
  };

  useEffect(() => {
    fetchTransactionHistory(undefined, undefined);

    if (errorMessage) {
      message.error(errorMessage);
    }
  }, [pagination.current, category]);

  useEffect(() => {
    setPagination({ pageSize: 8 });
  }, []);

  return (
    <div>
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
      <TabComponent
        defaultActiveKey={TransactionHistoryTabs[0]}
        onTabChange={handleTabChange}
        items={TransactionHistoryTabs}
      />

      <TableComponent<Record<string, any>>
        rowKey="id"
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
