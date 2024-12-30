import { Button, Table, Flex } from "antd";
import { Debt } from "../debtType";
import DebtStatusUI from "./DebtStatusUI";

interface DebtViewProps {
  debt: Debt;
  onPay: (debtId: string) => void;
  closeModal: () => void;
}

export const DebtView: React.FC<DebtViewProps> = ({
  debt,
  onPay,
  closeModal,
}) => {
  const {
    reminderFullName,
    debtorFullName,
    amount,
    message,
    createdAt,
    updatedAt,
    status,
  } = debt;

  const handlePay = async (debtId: string) => {
    try {
      // Call the onPay function to handle payment logic
      await onPay(debtId);
      // If payment is successful, close the modal
      closeModal();
    } catch (error) {
      // Handle payment failure
    }
  };

  // Data structure for the table
  const data = [
    { key: "reminder", label: "Người nhắc", value: reminderFullName },
    { key: "debtor", label: "Người nợ", value: debtorFullName },
    {
      key: "amount",
      label: "Số tiền",
      value: Number(amount).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
    },
    {
      key: "status",
      label: "Trạng thái",
      value: <DebtStatusUI status={status} />, // Using DebtStatusUI for consistent rendering
    },
    { key: "message", label: "Lời nhắn", value: message },
    {
      key: "createdAt",
      label: "Ngày tạo",
      value: new Date(createdAt).toLocaleString(),
    },
    {
      key: "updatedAt",
      label: "Ngày cập nhật",
      value: new Date(updatedAt).toLocaleString(),
    },
  ];

  // Columns for the table
  const columns = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      width: "150px",
      onCell: () => ({
        style: { backgroundColor: "#fafafa" },
      }),
    },
    {
      title: "",
      dataIndex: "value",
      key: "value",
      render: (text: any, record: any) => {
        if (record.key === "message") {
          return (
            <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
              {text}
            </div>
          );
        }
        return text;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="middle"
        rowKey="key"
        showHeader={false}
      />
      <Flex justify="flex-end" gap="middle" style={{ marginTop: "10px" }}>
        <Button style={{ marginLeft: 8 }} onClick={closeModal}>
          Đóng
        </Button>
        {status === "indebted" && (
          <Button type="primary" onClick={() => handlePay(debt.id)}>
            Thanh toán
          </Button>
        )}
      </Flex>
    </>
  );
};
