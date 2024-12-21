import React from "react";
import { Typography } from "antd";

interface IAccountCreateScreenProps {}

const AccountCreateScreen: React.FC<IAccountCreateScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>AccountCreateScreen</Typography.Title>
      <Typography.Paragraph>
        This is the AccountCreateScreen page.
      </Typography.Paragraph>
    </div>
  );
};

AccountCreateScreen.displayName = "AccountCreateScreen";

export default AccountCreateScreen;
