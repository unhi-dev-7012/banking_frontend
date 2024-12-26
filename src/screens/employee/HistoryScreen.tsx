import { Typography } from "antd";
import React, { useState } from "react";
import TableComponent from "../../components/common/HyTable/TableComponent";
import { EmployeeTransactionHistoryColumnConfig } from "../../features/history/historyType";
import EmployeeDetailTransactionModal from "../../features/history/components/DetailTransaction/EmployeeDetailTransactionModal";

const { Title } = Typography;

const transactionDataOverview = {
  data: [
    {
      id: "2d97dd40-4879-4eb8-bcc4-291bb863b1df",
      createdAt: "2024-12-23T15:42:41.743Z",
      updatedAt: "2024-12-23T15:43:17.584Z",
      remitter: {
        id: "21120001",
        name: "Nguyễn Khang Hy",
        bankName: "New Horizon Bank",
      },
      receiver: {
        id: "21120002",
        name: "Nguyễn Khang Hy",
        bankName: "New Horizon Bank",
      },
      type: "normal",
      status: "success",
      amount: 1000000,
      transactionFee: 3300,
      remitterPaidFee: false,
      completedAt: "2024-12-23T15:43:17.584Z",
    },
  ],
  metadata: {
    page: 1,
    totalCount: 1,
  },
};

const HistoryScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  return (
    <div style={{ padding: 12, maxHeight: "100vh", overflow: "auto" }}>
      <Title level={2}>Lịch sử giao dịch</Title>

      <TableComponent
        columns={EmployeeTransactionHistoryColumnConfig(
          setIsModalVisible,
          setSelectedTransaction
        )}
        data={transactionDataOverview}
        isLoading={false}
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
