import React from "react";
import { Typography } from "antd";

interface IInternalTransferScreenProps {}

const InternalTransferScreen: React.FC<IInternalTransferScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>InternalTransferScreen</Typography.Title>
      <Typography.Paragraph>
        This is the InternalTransferScreen page.
      </Typography.Paragraph>
    </div>
  );
};

InternalTransferScreen.displayName = "InternalTransferScreen";

export default InternalTransferScreen;
