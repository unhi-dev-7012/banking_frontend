import React from "react";
import { Typography } from "antd";

interface ICustomerAccountListScreenProps {}

const CustomerAccountListScreen: React.FC<
  ICustomerAccountListScreenProps
> = () => {
  return (
    <div>
      <Typography.Title level={2}>CustomerAccountListScreen</Typography.Title>
      <Typography.Paragraph>
        This is the CustomerAccountListScreen page.
      </Typography.Paragraph>
    </div>
  );
};

CustomerAccountListScreen.displayName = "CustomerAccountListScreen";

export default CustomerAccountListScreen;
