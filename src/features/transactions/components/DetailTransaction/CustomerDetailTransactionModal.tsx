import { Button, Descriptions, Modal, Tag } from "antd";
import React from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
} from "@ant-design/icons";

interface CustomerDetailTransactionModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  transaction: Record<string, any>;
}
const CustomerDetailTransactionModal: React.FC<
  CustomerDetailTransactionModalProps
> = ({ visible, setVisible, transaction }) => {
  const affectedUser =
    transaction.category === "incoming" ? "Người gửi" : "Người  nhận";
  return (
    <Modal
      title="Chi tiết giao dịch"
      centered
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="close" onClick={() => setVisible(false)} danger>
          Đóng
        </Button>,
      ]}
      width={600}
      open={visible}
      style={{ minHeight: "60vh", minWidth: "60vw", maxWidth: "80vw" }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Ngày giao dịch">
          {new Date(transaction.date).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label={affectedUser}>
          <span style={{ fontWeight: "bold" }}>
            {transaction.relatedUser.name}
          </span>
          <br />
          <span style={{ color: "#888" }}>
            {transaction.relatedUser.bankAccountId}
          </span>
          <br />
          <span style={{ color: "#888" }}>
            {transaction.relatedUser.bankName}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={transaction.status === "success" ? "green" : "orange"}>
            {transaction.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Loại giao dịch">
          <Tag
            color={
              transaction.category === "incoming"
                ? "blue"
                : transaction.category === "outcoming"
                ? "red"
                : "gold"
            }
          >
            {transaction.category === "incoming" && (
              <>
                <ArrowDownOutlined style={{ color: "green" }} /> Tiền vào
              </>
            )}
            {transaction.category === "outcoming" && (
              <>
                <ArrowUpOutlined style={{ color: "red" }} /> Tiền ra
              </>
            )}
            {transaction.category === "debt" && (
              <>
                <DollarOutlined style={{ color: "orange" }} /> Thanh toán nợ
              </>
            )}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Số tiền">
          {transaction.amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Nội dung chuyển khoản">
          <span style={{ whiteSpace: "pre-wrap" }}>
            {transaction.message || "No message available"}
          </span>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default CustomerDetailTransactionModal;
