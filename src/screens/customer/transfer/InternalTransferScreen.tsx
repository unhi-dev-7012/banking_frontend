import React, { useState } from "react";
import { Button, Flex, message, Steps, theme, Typography } from "antd";
import CreateTransactionForm from "@features/customer/transfer_transaction/components/CreateTransactionForm";
import ViewTransactionForm from "@features/customer/transfer_transaction/components/ViewTransactionDetails";

interface IInternalTransferScreenProps {}

const messages = {
  title: "Chuyển khoản trong ngân hàng",
  description:
    "Bạn có thể dùng trang này để thực hiện các giao dịch trong ngân hàng",
};

const InternalTransferScreen: React.FC<IInternalTransferScreenProps> = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0); // State to track the current step

  const steps = (next: () => void) => [
    {
      title: "Điền thông tin",
      content: (
        <CreateTransactionForm
          onSubmitSuccess={next} // Trigger next step after success
        />
      ),
    },
    {
      title: "Xác thực giao dịch",
      content: (
        <ViewTransactionForm
          onSubmitSuccess={next} // Trigger next step after success
        />
      ),
    },
    {
      title: "Thông báo kết quả",
      content: "Last-content", // Placeholder for result notification
    },
  ];

  const next = () => {
    setCurrent(current + 1); // Go to the next step
  };

  const prev = () => {
    setCurrent(current - 1); // Go to the previous step
  };

  const items = steps(next).map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    color: token.colorTextTertiary,
    padding: "10px",
    // backgroundColor: token.colorFillAlter,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 10,
  };

  return (
    <div>
      <Typography.Title level={3} style={{ margin: "0 0 5px 0" }}>
        {messages.title}
      </Typography.Title>

      <Flex style={{ width: "100%" }} justify="center">
        <Steps current={current} items={items} style={{ width: "50%" }} />
      </Flex>
      <Flex justify="center" style={contentStyle}>
        {steps(next)[current].content}
      </Flex>
    </div>
  );
};

InternalTransferScreen.displayName = "InternalTransferScreen";

export default InternalTransferScreen;
