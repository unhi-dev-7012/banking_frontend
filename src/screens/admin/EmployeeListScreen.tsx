import ModalWrapper from "@components/common/Form/ModalWrapper";
import EmployeeForm from "@features/admin/employees/components/EmployeeForm";
import EmployeeTable from "@features/admin/employees/components/EmployeeTable";
import { Button, Flex, Typography } from "antd";
import React, { useState } from "react";

const messages = {
  title: "Quản lý nhân viên",
  description:
    "Bạn có thể dùng trang này để quản lý tài khoản của nhân viên ngân hàng.",
  buttons: {
    create: "Tạo tài khoản nhân viên",
  },
  modal: {
    title: "Tạo tài khoản nhân viên",
  },
};

interface IEmployeeListScreenProps {}

const EmployeeListScreen: React.FC<IEmployeeListScreenProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <Flex vertical gap="middle">
      <Typography.Title level={2}>{messages.title}</Typography.Title>
      <Typography.Text>{messages.description}</Typography.Text>

      <Flex justify="end">
        <Button type="primary" onClick={openModal}>
          {messages.buttons.create}
        </Button>
        <ModalWrapper
          open={modalVisible}
          title={messages.modal.title}
          onCancel={closeModal}
        >
          <EmployeeForm closeModal={closeModal} />
        </ModalWrapper>
      </Flex>

      <EmployeeTable />
    </Flex>
  );
};

EmployeeListScreen.displayName = "EmployeeListScreen";

export default EmployeeListScreen;
