import React, { useState } from "react";
import { Flex, Steps, theme, Typography } from "antd";
import ViewTransactionForm from "@features/customer/transfer_transaction/components/ViewTransactionDetails";
import ViewTransactionResult from "@features/customer/transfer_transaction/components/ViewTransactionResult";

interface IDebtSettleScreenProps {}

const messages = {
  title: "Thanh toán nợ",
  description:
    "Bạn có thể dùng trang này để thực hiện các giao dịch trong ngân hàng",
};

const DebtSettleScreen: React.FC<IDebtSettleScreenProps> = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0); // State to track the current step

  const steps = (next: () => void) => [
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

DebtSettleScreen.displayName = "DebtSettleScreen";

export default DebtSettleScreen;
