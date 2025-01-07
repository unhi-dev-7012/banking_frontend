import React, { useEffect, useState } from "react";
import { Button, Typography, Modal, Flex } from "antd"; // Thêm Modal
import { useDebtStore } from "@features/customer/debt/stores/debtStore";
import { DebtCategory } from "@features/customer/debt/debtType";
import DebtTable from "@features/customer/debt/components/DebtTable";
import CreateDebtForm from "@features/customer/debt/components/CreateDebtForm";

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
  const {
    data,
    loading,
    fetchTableData,
    setCategory,
    pagination,
    cancelDebt,
    setPagination,
    activeTab,
    setTab,
  } = useDebtStore();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    fetchTableData();
  }, [pagination.current, pagination.total, activeTab]);

  const handleTabChange = (tab: string) => {
    setTab(tab);
    setCategory(
      tab === "created"
        ? DebtCategory.CREATED_BY_ME
        : DebtCategory.CREATED_FOR_ME
    );
    setPagination({
      current: 1,
    });
    fetchTableData();
  };

  // Handler hủy nợ
  const handleCancelDebt = (debtId: string) => {
    cancelDebt(debtId);
  };

  return (
    <div>
      <Typography.Title level={2} className="titleTypography">
        {messages.title}
      </Typography.Title>
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
      />
    </div>
  );
};

DebtListScreen.displayName = "DebtListScreen";

export default DebtListScreen;
