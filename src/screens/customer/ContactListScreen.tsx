import React, { useEffect, useState } from "react";
import { Button, Flex, Typography } from "antd";
import { ContactProvider } from "@features/customer/contact/components/ContactProvider";
import { ContactTable } from "@features/customer/contact/components/ContactTable";
import ModalWrapper from "@components/common/Form/ModalWrapper";
import ContactForm from "@features/customer/contact/components/ContactForm";
import { Contact } from "@features/customer/contact/contact.type";

interface IContactListScreenProps {}

const messages = {
  title: "Danh bạ người nhận",
  description: "Bạn có thể quản lý danh sách người nhận của mình từ trang này.",
  buttons: {
    create: "Thêm người nhận",
  },
  modal: {
    title: "Thêm người nhận mới",
  },
};

const emptyContact = {
  beneficiaryId: "",
  bankName: "",
  beneficiaryName: "",
  nickname: "",
  id: "",
  bankId: "",
};

const ContactListScreen: React.FC<IContactListScreenProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [initialValues, setInitialValues] = useState<Contact>();
  const closeModal = () => setModalVisible(false);

  const openAddModal = () => {
    setModalMode("add");
    setInitialValues(emptyContact);
    setModalVisible(true);
  };

  const openEditModal = (record: Contact) => {
    setModalMode("edit");
    setInitialValues(record);
    setModalVisible(true);
  };

  return (
    <ContactProvider>
      <div style={{ padding: 12, maxHeight: "100vh", overflow: "auto" }}>
        <Flex
          justify="space-between"
          align="flex-end"
          style={{ marginBottom: 24 }}
        >
          <div>
            <Typography.Title level={2}>{messages.title}</Typography.Title>
            <Typography.Text>{messages.description}</Typography.Text>
          </div>
          <Button type="primary" onClick={openAddModal}>
            {messages.buttons.create}
          </Button>
        </Flex>
        <ModalWrapper
          open={modalVisible}
          title={messages.modal.title}
          onCancel={closeModal}
        >
          <ContactForm
            closeModal={closeModal}
            mode={modalMode}
            initialValues={initialValues}
          />
        </ModalWrapper>

        <ContactTable editRecord={openEditModal} />
      </div>
    </ContactProvider>
  );
};

ContactListScreen.displayName = "ContactListScreen";

export default ContactListScreen;
