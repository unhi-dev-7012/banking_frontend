import React from "react";
import { Typography } from "antd";

interface ICustomerHistoryScreenProps {}

const CustomerHistoryScreen: React.FC<ICustomerHistoryScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>CustomerHistoryScreen</Typography.Title>
      <Typography.Paragraph>
        This is the CustomerHistoryScreen page.
      </Typography.Paragraph>
    </div>
  );
};

CustomerHistoryScreen.displayName = "CustomerHistoryScreen";

export default CustomerHistoryScreen;
