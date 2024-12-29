import React, { useEffect, useState } from "react";
import { Button, Typography, Modal, Flex } from "antd"; // Thêm Modal
import { useDebtStore } from "@features/debt/stores/debtStore";
import { DebtCategory } from "@features/debt/debtType";
import DebtTable from "@features/debt/components/DebtTable";
import CreateDebtForm from "@features/debt/components/CreateDebtForm";

const messages = {
  title: "Quản lý nợ",
  description: "Bạn có thể quản lý danh sách nợ của mình từ trang này.",
  buttons: {
    create: "Tạo nợ",
  },
  modal: {
    title: "Tạo nợ",
  },
};

const DebtListScreen: React.FC = () => {
  const { data, loading, fetchTableData, setCategory, pagination } =
    useDebtStore();
  const [activeTab, setActiveTab] = useState("created");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    fetchTableData();
  }, [pagination.current, pagination.total]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCategory(
      tab === "created"
        ? DebtCategory.CREATED_BY_ME
        : DebtCategory.CREATED_FOR_ME
    );
    fetchTableData(); // Fetch lại dữ liệu khi đổi tab
  };

  // Handler hủy nợ
  const handleCancelDebt = (debtId: string) => {
    console.log("Hủy nợ với ID:", debtId);
    // fetchTableData();
  };

  // Handler thanh toán nợ
  const handlePayDebt = (debtId: string) => {
    console.log("Thanh toán nợ với ID:", debtId);
    // fetchTableData();
  };

  return (
    <div>
      <Typography.Title level={2}>{messages.title}</Typography.Title>
      <Flex justify="space-between">
        <Typography.Text>{messages.description}</Typography.Text>

        {/* Nút "Tạo nợ" */}
        <Button type="primary" onClick={openModal}>
          {messages.buttons.create}
        </Button>
      </Flex>

      {/* Modal tạo nợ */}
      <Modal
        title={messages.modal.title}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <CreateDebtForm closeModal={closeModal} />
      </Modal>

      {/* DebtTable */}
      <DebtTable
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        debts={data}
        loading={loading}
        onCancel={handleCancelDebt} // Truyền handler hủy nợ
        onPay={handlePayDebt} // Truyền handler thanh toán nợ
      />
    </div>
  );
};

DebtListScreen.displayName = "DebtListScreen";

export default DebtListScreen;
