import React from "react";
import { Typography } from "antd";

interface IAdminDashboardScreenProps {}

const AdminDashboardScreen: React.FC<IAdminDashboardScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>AdminDashboardScreen</Typography.Title>
      <Typography.Paragraph>
        This is the AdminDashboardScreen page.
      </Typography.Paragraph>
    </div>
  );
};

AdminDashboardScreen.displayName = "AdminDashboardScreen";

export default AdminDashboardScreen;
