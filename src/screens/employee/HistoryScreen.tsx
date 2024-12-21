import React from "react";
import { Typography } from "antd";

interface IHistoryScreenProps {}

const HistoryScreen: React.FC<IHistoryScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>HistoryScreen</Typography.Title>
      <Typography.Paragraph>
        This is the HistoryScreen page.
      </Typography.Paragraph>
    </div>
  );
};

HistoryScreen.displayName = "HistoryScreen";

export default HistoryScreen;
