import React from "react";
import { Typography } from "antd";

interface IDebtCreateScreenProps {}

const DebtCreateScreen: React.FC<IDebtCreateScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>DebtCreateScreen</Typography.Title>
      <Typography.Paragraph>
        This is the DebtCreateScreen page.
      </Typography.Paragraph>
    </div>
  );
};

DebtCreateScreen.displayName = "DebtCreateScreen";

export default DebtCreateScreen;
