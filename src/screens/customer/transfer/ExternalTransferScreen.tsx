import React from "react";
import { Typography } from "antd";

interface IExternalTransferScreenProps {}

const ExternalTransferScreen: React.FC<IExternalTransferScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>ExternalTransferScreen</Typography.Title>
      <Typography.Paragraph>
        This is the ExternalTransferScreen page.
      </Typography.Paragraph>
    </div>
  );
};

ExternalTransferScreen.displayName = "ExternalTransferScreen";

export default ExternalTransferScreen;
