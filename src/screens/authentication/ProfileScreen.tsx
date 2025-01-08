import React, { useEffect, useState } from "react";
import { Row, Typography } from "antd";
import ProfileRow from "@components/common/authorization/ProfileRow";
import { getUserData, UserData } from "@features/auth/services/getUserData";

interface IProfileScreenProps {}

const messages = {
  title: "Hồ sơ",
  descriptions: "Đây là trang hiển thị thông tin tài khoản của quý khách.",
  columnHeaderKeys: {
    fullName: "Họ và tên",
    username: "Tên đăng nhập",
    email: "Email",
    createdAt: "Ngày tạo",
  },
};

const ProfileScreen: React.FC<IProfileScreenProps> = () => {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Typography.Title level={2} className="titleTypography">
        {messages.title}
      </Typography.Title>
      <Typography.Paragraph>{messages.descriptions}</Typography.Paragraph>

      <Row
        style={{
          marginTop: "30px",
        }}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <ProfileRow
          title={messages.columnHeaderKeys.fullName}
          data={userData?.fullName}
          hasDivder
        />
        <ProfileRow
          title={messages.columnHeaderKeys.username}
          data={userData?.username}
          hasDivder
        />
        <ProfileRow
          title={messages.columnHeaderKeys.email}
          data={userData?.email}
          hasDivder
        />
        <ProfileRow
          title={messages.columnHeaderKeys.createdAt}
          data={
            userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString()
              : ""
          }
          hasDivder
        />
      </Row>
    </div>
  );
};

ProfileScreen.displayName = "ProfileScreen";

export default ProfileScreen;
