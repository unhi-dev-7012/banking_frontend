import React from "react";
import { Typography } from "antd";

interface ICustomerDashboardScreenProps {}

const CustomerDashboardScreen: React.FC<ICustomerDashboardScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>CustomerDashboardScreen</Typography.Title>
      <Typography.Paragraph>
        This is the CustomerDashboardScreen page.
      </Typography.Paragraph>
    </div>
  );
};

CustomerDashboardScreen.displayName = "CustomerDashboardScreen";

export default CustomerDashboardScreen;
