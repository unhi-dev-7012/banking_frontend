import React from "react";
import { Typography } from "antd";

interface IContactListScreenProps {}

const ContactListScreen: React.FC<IContactListScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>ContactListScreen</Typography.Title>
      <Typography.Paragraph>
        This is the ContactListScreen page.
      </Typography.Paragraph>
    </div>
  );
};

ContactListScreen.displayName = "ContactListScreen";

export default ContactListScreen;
