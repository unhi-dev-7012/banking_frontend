import React from "react";
import { Typography } from "antd";

interface IDebtListScreenProps {}

const DebtListScreen: React.FC<IDebtListScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>DebtListScreen</Typography.Title>
      <Typography.Paragraph>
        This is the DebtListScreen page.
      </Typography.Paragraph>
    </div>
  );
};

DebtListScreen.displayName = "DebtListScreen";

export default DebtListScreen;
