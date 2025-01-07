import React, { useState } from "react";
import { Button, Flex, message, Steps, theme, Typography } from "antd";
import ViewTransactionForm from "@features/customer/transfer_transaction/components/ViewTransactionDetails";
import ViewTransactionResult from "@features/customer/transfer_transaction/components/ViewTransactionResult";
import CreateExternalTransactionForm from "@features/customer/transfer_transaction/components/CreateExternalTransactionForm";

interface IExrernalTransferScreenProps {}

const messages = {
  title: "Chuyển khoản liên ngân hàng",
  description:
    "Bạn có thể dùng trang này để thực hiện các giao dịch liên ngân hàng",
};

const ExternalTransferScreen: React.FC<IExrernalTransferScreenProps> = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0); // State to track the current step

  const steps = (next: () => void) => [
    {
      title: "Điền thông tin",
      content: <CreateExternalTransactionForm onSubmitSuccess={next} />,
    },
    {
      title: "Xác thực giao dịch",
      content: <ViewTransactionForm onSubmitSuccess={next} />,
    },
    {
      title: "Thông báo kết quả",
      content: <ViewTransactionResult onSubmitSuccess={next} />,
    },
  ];

  const next = () => {
    console.log("next", current + 1);
    setCurrent(current + 1);
  };

  const items = steps(next).map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    color: token.colorTextTertiary,
    padding: "10px",
    borderRadius: token.borderRadiusLG,
    marginTop: 10,
  };

  return (
    <div>
      <Typography.Title level={2}>{messages.title}</Typography.Title>
      <Typography.Text>{messages.description}</Typography.Text>

      <Flex style={{ width: "100%", marginTop: "10px" }} justify="center">
        <Steps current={current} items={items} style={{ width: "50%" }} />
      </Flex>
      <Flex justify="center" style={contentStyle}>
        {steps(next)[current].content}
      </Flex>
    </div>
  );
};

ExternalTransferScreen.displayName = "InternalTransferScreen";

export default ExternalTransferScreen;
