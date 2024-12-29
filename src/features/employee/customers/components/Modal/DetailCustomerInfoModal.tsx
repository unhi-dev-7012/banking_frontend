import { Button, Modal, Descriptions, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";

interface DetailCustomerInfoModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  customer: Record<string, any>;
}

const { Title } = Typography;

const DetailCustomerInfoModal: React.FC<DetailCustomerInfoModalProps> = ({
  visible,
  setVisible,
  customer,
}) => {
  return (
    <Modal
      title="Chi tiết khách hàng"
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
      {customer && (
        <>
          <Title level={5}>{customer.fullName}</Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên đăng nhập">
              {customer.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <a href={`mailto:${customer.email}`}>
                <MailOutlined /> {customer.email}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Số tài khoản">
              {customer.bankAccount?.id}
            </Descriptions.Item>
            <Descriptions.Item label="Số dư tài khoản">
              {customer.bankAccount?.balance?.toLocaleString()} VND
            </Descriptions.Item>
            <Descriptions.Item label="Người tạo">
              {customer.createdByEmployee?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Chức vụ người tạo">
              {customer.createdByEmployee?.role}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {new Date(customer.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {new Date(customer.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
};

export default DetailCustomerInfoModal;
