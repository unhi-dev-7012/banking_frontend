import React from 'react';
import { Typography } from 'antd';

interface INotificationScreenProps {}

const NotificationScreen: React.FC<INotificationScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>NotificationScreen</Typography.Title>
      <Typography.Paragraph>This is the NotificationScreen page.</Typography.Paragraph>
    </div>
  );
};

NotificationScreen.displayName = 'NotificationScreen';

export default NotificationScreen;
