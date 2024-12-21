import React from 'react';
import { Typography } from 'antd';

interface ILandingScreenProps {}

const LandingScreen: React.FC<ILandingScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>LandingScreen</Typography.Title>
      <Typography.Paragraph>This is the LandingScreen page.</Typography.Paragraph>
    </div>
  );
};

LandingScreen.displayName = 'LandingScreen';

export default LandingScreen;
