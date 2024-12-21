import React from "react";
import { Typography } from "antd";

interface IEmployeeListScreenProps {}

const EmployeeListScreen: React.FC<IEmployeeListScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>EmployeeListScreen</Typography.Title>
      <Typography.Paragraph>
        This is the EmployeeListScreen page.
      </Typography.Paragraph>
    </div>
  );
};

EmployeeListScreen.displayName = "EmployeeListScreen";

export default EmployeeListScreen;
