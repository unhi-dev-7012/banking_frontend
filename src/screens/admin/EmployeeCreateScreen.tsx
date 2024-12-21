import React from "react";
import { Typography } from "antd";

interface IEmployeeCreateScreenProps {}

const EmployeeCreateScreen: React.FC<IEmployeeCreateScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>EmployeeCreateScreen</Typography.Title>
      <Typography.Paragraph>
        This is the EmployeeCreateScreen page.
      </Typography.Paragraph>
    </div>
  );
};

EmployeeCreateScreen.displayName = "EmployeeCreateScreen";

export default EmployeeCreateScreen;
