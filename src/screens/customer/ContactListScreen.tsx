import React from "react";
import { Typography } from "antd";
import { ContactProvider } from "@features/customer/contact/components/ContactProvider";
import { ContactTable } from "@features/customer/contact/components/ContactTable";

interface IContactListScreenProps {}

const messages = {
  title: "Danh bạ người nhận",
};

const ContactListScreen: React.FC<IContactListScreenProps> = () => {
  return (
    <ContactProvider>
      <div>
        <Typography.Title level={2}>{messages.title}</Typography.Title>
        <ContactTable />
      </div>
    </ContactProvider>
  );
};

ContactListScreen.displayName = "ContactListScreen";

export default ContactListScreen;
