import { Button, Flex, Popover } from "antd";
import { Debt, DebtStatus } from "../debtType";
import DebtStatusUI from "./DebtStatusUI";
import { DollarSign, Ellipsis, Info, X } from "lucide-react";

// Hàm lấy cột của bảng nợ, có thể cấu hình cho các tab khác nhau
// Reusable function to render action buttons based on conditions
const renderActionButtons = (
  record: Debt,
  onCancel: (debtId: string) => void,
  onPay: (debtId: string) => void,
  activeTab: string
) => {
  const isCreatedTab = activeTab === "created";
  const isReceivedTab = activeTab === "received";
  const isCanceled = record.status === DebtStatus.CANCELED;

  // View Details button is always shown
  const buttons = [
    <Button
      key="view-details"
      type="text"
      onClick={() => onPay(record.id)}
      style={{ width: "100%", justifyContent: "flex-start", color: "#1677ff" }}
      icon={<Info size={14} />}
    >
      Xem chi tiết
    </Button>,
  ];

  // Add a horizontal line after the first button
  const hr = (
    <hr
      key="line-1"
      style={{
        border: "none",
        borderTop: "1px solid #f0f0f0",
        margin: "4px 0",
      }}
    />
  );

  if (!isCanceled) {
    if (isCreatedTab) {
      // Show "Thanh toán" and "Hủy" for "Created" tab
      buttons.push(
        hr,
        <Button
          key="pay"
          icon={<DollarSign size={14} />}
          type="text"
          onClick={() => onCancel(record.id)}
          style={{ width: "100%", justifyContent: "flex-start" }}
        >
          Thanh toán
        </Button>,
        hr,
        <Button
          key="cancel"
          icon={<X size={14} />}
          type="text"
          onClick={() => onCancel(record.id)}
          style={{ width: "100%", justifyContent: "flex-start" }}
          danger
        >
          Hủy
        </Button>
      );
    }

    if (isReceivedTab) {
      // Show "Thanh toán" for "Received" tab
      buttons.push(
        hr,
        <Button
          key="pay-received"
          icon={<DollarSign size={14} />}
          type="text"
          onClick={() => onCancel(record.id)}
          style={{ width: "100%", justifyContent: "flex-start" }}
        >
          Thanh toán
        </Button>
      );
    }
  }

  return buttons;
};

const getDebtColumns = (
  activeTab: string,
  onCancel: (debtId: string) => void,
  onPay: (debtId: string) => void
) => {
  return [
    {
      title:
        activeTab === "created" ? "Tài khoản người nợ" : "Tài khoản nhắc nợ",
      dataIndex: activeTab === "created" ? "debtorId" : "reminderId",
      key: activeTab === "created" ? "debtorId" : "reminderId",
    },
    {
      title: "Tên tài khoản",
      dataIndex:
        activeTab === "created" ? "debtorFullName" : "reminderFullName",
      key: activeTab === "created" ? "debtorFullName" : "reminderFullName",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) =>
        amount?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: Debt) => <DebtStatusUI status={record.status} />,
    },
    { title: "Nội dung", dataIndex: "message", key: "message" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Debt) => (
        <Popover
          content={
            <Flex vertical justify="flex-start">
              {renderActionButtons(record, onCancel, onPay, activeTab)}
            </Flex>
          }
          title=""
          trigger="click"
          placement="bottomRight"
        >
          <Button icon={<Ellipsis />} />
        </Popover>
      ),
    },
  ];
};

export default getDebtColumns;
