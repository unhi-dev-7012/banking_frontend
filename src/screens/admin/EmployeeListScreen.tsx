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
    <Flex
      vertical
      style={{
        height: "100%",
        padding: "0px 14px 0px 14px",
      }}
      gap="middle"
    >
      <Typography.Title level={3}>{messages.title}</Typography.Title>

      <Flex justify="space-between">
        <Typography.Text>{messages.description}</Typography.Text>
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
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <EmployeeTable />
      </div>
      {/* <Flex
        vertical
        style={{
          height: "100%",
          scrollBehavior: "smooth",
        }}
      >
        <EmployeeTable />
      </Flex> */}
    </Flex>
  );
};

EmployeeListScreen.displayName = "EmployeeListScreen";

export default EmployeeListScreen;
