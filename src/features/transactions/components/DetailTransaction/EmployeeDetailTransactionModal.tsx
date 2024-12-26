import { Modal, Button, Descriptions, Tag, Typography } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
const { Text } = Typography;

interface EmployeeDetailTransactionModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  transaction: Record<string, any>;
}
const EmployeeDetailTransactionModal: React.FC<
  EmployeeDetailTransactionModalProps
> = ({ visible, setVisible, transaction }) => {
  return (
    <Modal
      title="Chi tiết giao dịch"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="close" onClick={() => setVisible(false)} danger>
          Đóng
        </Button>,
      ]}
      centered
      style={{ minHeight: "60vh", minWidth: "60vw", maxWidth: "80vw" }}
    >
      {transaction && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Mã giao dịch">
            {transaction.id.toUpperCase()}
          </Descriptions.Item>
          <Descriptions.Item label="Người gửi">
            <div>
              <Text strong>{transaction.remitter.name.toUpperCase()}</Text>
              <br />
              <Text type="secondary">{transaction.remitter.id}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {transaction.remitter.bankName}
              </Text>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Người nhận">
            <div>
              <Text strong>{transaction.beneficiary.name.toUpperCase()}</Text>
              <br />
              <Text type="secondary">{transaction.beneficiary.id}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {transaction.beneficiary.bankName}
              </Text>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Người chịu phí">
            {transaction.remitterPaidFee ? (
              <Tag icon={<UserOutlined />} color="blue">
                Người chuyển
              </Tag>
            ) : (
              <Tag icon={<TeamOutlined />} color="purple">
                Người nhận
              </Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền">
            {transaction.amount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Phí dịch vụ">
            {transaction.transactionFee.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={transaction.status === "success" ? "green" : "orange"}>
              {transaction.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày giao dịch">
            {new Date(transaction.completedAt).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default EmployeeDetailTransactionModal;
