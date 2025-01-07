import React from "react";
import AccountCard from "../../features/account/components/AccountCard";
import { Typography } from "antd";

const messages = {
  title: "Danh sách tài khoản",
  description: "Bạn có thể quản lý tài khoản của mình từ trang này.",
};

const CustomerAccountListScreen: React.FC = () => {
  return (
    <>
      <Typography.Title level={2}>{messages.title}</Typography.Title>
      <Typography.Text>{messages.description}</Typography.Text>
      <div style={{ marginTop: 10 }}>
        <AccountCard />
      </div>
    </>
  );
};

CustomerAccountListScreen.displayName = "CustomerAccountListScreen";

export default CustomerAccountListScreen;
