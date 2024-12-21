import React from "react";
import { Typography } from "antd";

interface IAccountListScreenProps {}

const AccountListScreen: React.FC<IAccountListScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>AccountListScreen</Typography.Title>
      <Typography.Paragraph>
        This is the AccountListScreen page.
      </Typography.Paragraph>
    </div>
  );
};

AccountListScreen.displayName = "AccountListScreen";

export default AccountListScreen;
