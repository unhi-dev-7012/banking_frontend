import React from "react";
import { Typography } from "antd";

interface IProfileScreenProps {}

const ProfileScreen: React.FC<IProfileScreenProps> = () => {
  return (
    <div>
      <Typography.Title level={2}>ProfileScreen</Typography.Title>
      <Typography.Paragraph>
        This is the ProfileScreen page.
      </Typography.Paragraph>
    </div>
  );
};

ProfileScreen.displayName = "ProfileScreen";

export default ProfileScreen;
