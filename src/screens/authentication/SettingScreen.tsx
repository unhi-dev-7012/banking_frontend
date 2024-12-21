import React from 'react';
import { Typography } from 'antd';

interface ISettingScreenProps {}

const SettingScreen: React.FC<ISettingScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>SettingScreen</Typography.Title>
      <Typography.Paragraph>This is the SettingScreen page.</Typography.Paragraph>
    </div>
  );
};

SettingScreen.displayName = 'SettingScreen';

export default SettingScreen;
