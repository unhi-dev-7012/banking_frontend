import React from "react";
import { Typography } from "antd";

interface IDepositScreenProps {}

const DepositScreen: React.FC<IDepositScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>DepositScreen</Typography.Title>
      <Typography.Paragraph>
        This is the DepositScreen page.
      </Typography.Paragraph>
    </div>
  );
};

DepositScreen.displayName = "DepositScreen";

export default DepositScreen;
