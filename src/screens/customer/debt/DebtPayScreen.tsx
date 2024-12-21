import React from "react";
import { Typography } from "antd";

interface IDebtPayScreenProps {}

const DebtPayScreen: React.FC<IDebtPayScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>DebtPayScreen</Typography.Title>
      <Typography.Paragraph>
        This is the DebtPayScreen page.
      </Typography.Paragraph>
    </div>
  );
};

DebtPayScreen.displayName = "DebtPayScreen";

export default DebtPayScreen;
