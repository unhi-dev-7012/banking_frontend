import React, { useState } from "react";
import { Button, message, Steps, theme, Typography } from "antd";
import CreateTransactionForm from "@features/customer/transfer_transaction/components/CreateTransactionForm";

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
      content: "Second-content", // Placeholder, replace with OTP verification component
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
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div>
      <Typography.Title level={3}>{messages.title}</Typography.Title>
      <Typography.Paragraph>{messages.description}</Typography.Paragraph>

      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps(next)[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current === steps(next).length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Hoàn tất giao dịch
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Hủy giao dịch
          </Button>
        )}
      </div>
    </div>
  );
};

InternalTransferScreen.displayName = "InternalTransferScreen";

export default InternalTransferScreen;
