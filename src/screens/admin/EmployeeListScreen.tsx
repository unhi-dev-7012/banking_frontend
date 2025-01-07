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
    <div>
      <Typography.Title level={2} className="titleTypography">
        {messages.title}
      </Typography.Title>

      <Flex justify="space-between" style={{ marginBottom: "20px" }}>
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
    </div>
  );
};

EmployeeListScreen.displayName = "EmployeeListScreen";

export default EmployeeListScreen;
