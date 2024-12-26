import React, { useEffect, useState } from "react";
import { Typography, message } from "antd";
import TableComponent from "../../components/common/HyTable/TableComponent";
import TabComponent from "../../components/common/Tab/TabComponent";
import CustomerDetailTransactionModal from "../../features/history/components/DetailTransaction/CustomerDetailTransactionModal";
import {
  CustomerTransactionHistoryColumnConfig,
  TransactionHistoryTabs,
} from "../../features/history/historyType";
import { useHistory } from "../../features/history/stores/useTransactionHistory";
import { TransactionCategory } from "../../features/history/services/customerHistory";

const { Title } = Typography;

const CustomerHistoryScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const {
    transactionHistory,
    fetchTransactionHistory,
    isLoading,
    errorMessage,
  } = useHistory();

  const handleTabChange = (key: string) => {
    if (key === "all") {
      fetchTransactionHistory(1, undefined, undefined, undefined, undefined);
      if (errorMessage) {
        message.error(errorMessage);
      }
    } else {
      fetchTransactionHistory(
        1,
        undefined,
        key as TransactionCategory,
        undefined,
        undefined
      );
    }
  };

  useEffect(() => {
    fetchTransactionHistory(1, undefined, undefined, undefined, undefined);
  }, []);

  return (
    <div style={{ padding: 12, maxHeight: "100vh", overflow: "auto" }}>
      <Title level={2}>Lịch sử giao dịch</Title>

      <TabComponent
        defaultActiveKey={TransactionHistoryTabs[0]}
        onTabChange={handleTabChange}
        items={TransactionHistoryTabs}
      />

      <TableComponent
        columns={CustomerTransactionHistoryColumnConfig(
          setIsModalVisible,
          setSelectedTransaction
        )}
        data={transactionHistory}
        isLoading={isLoading}
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
