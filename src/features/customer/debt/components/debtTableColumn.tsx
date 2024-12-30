import { Button, Flex, Popover } from "antd";
import { Debt, DebtStatus } from "../debtType";
import DebtStatusUI from "./DebtStatusUI";
import { DollarSign, Ellipsis, Info, X } from "lucide-react";
import { useState } from "react";

// Hàm lấy cột của bảng nợ, có thể cấu hình cho các tab khác nhau
// Reusable function to render action buttons based on conditions
const renderActionButtons = (
  record: Debt,
  onCancel: (debtId: string) => void,
  onPay: (debtId: string) => void,
  onView: (debtId: string) => void,
  activeTab: string,
  setPopoverVisible: (debtId: string, visible: boolean) => void
) => {
  const isCreatedTab = activeTab === "created";
  const isReceivedTab = activeTab === "received";
  const isCanceled = record.status === DebtStatus.CANCELED;
  const isPay = record.status === DebtStatus.SETTLED;

  // View Details button is always shown
  const buttons = [
    <Button
      key="view-details"
      type="text"
      onClick={() => {
        onView(record.id);
        setPopoverVisible(record.id, false); // Close Popover
      }}
      style={{ width: "100%", justifyContent: "flex-start", color: "#1677ff" }}
      icon={<Info size={14} />}
    >
      Xem chi tiết
    </Button>,
  ];

  // Add a horizontal line after the first button
  const hr = (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #f0f0f0",
        margin: "4px 0",
      }}
    />
  );

  if (!isCanceled && !isPay) {
    if (isCreatedTab) {
      buttons.push(
        hr,
        <Button
          key="pay"
          icon={<DollarSign size={14} />}
          type="text"
          onClick={() => {
            onPay(record.id);
            setPopoverVisible(record.id, false); // Close Popover
          }}
          style={{ width: "100%", justifyContent: "flex-start" }}
        >
          Thanh toán
        </Button>,
        hr,
        <Button
          key="cancel"
          icon={<X size={14} />}
          type="text"
          onClick={() => {
            onCancel(record.id);
            setPopoverVisible(record.id, false); // Close Popover
          }}
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
          onClick={() => {
            onPay(record.id);
            setPopoverVisible(record.id, false); // Close Popover
          }}
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
  onPay: (debtId: string) => void,
  onView: (debtId: string) => void
) => {
  const [popoverStates, setPopoverStates] = useState<{
    [key: string]: boolean;
  }>({});
  const setPopoverVisible = (debtId: string, visible: boolean) => {
    setPopoverStates((prevState) => ({
      ...prevState,
      [debtId]: visible,
    }));
  };

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
      render: (amount: string) =>
        Number(amount).toLocaleString("vi-VN", {
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
              {renderActionButtons(
                record,
                onCancel,
                onPay,
                onView,
                activeTab,
                setPopoverVisible
              )}
            </Flex>
          }
          title=""
          trigger="click"
          open={popoverStates[record.id] || false} // Check visibility per debtId
          placement="bottomRight"
          onOpenChange={(visible) => setPopoverVisible(record.id, visible)}
        >
          <Button icon={<Ellipsis />} />
        </Popover>
      ),
    },
  ];
};

export default getDebtColumns;
