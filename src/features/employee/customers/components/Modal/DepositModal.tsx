import React, { useEffect } from "react";
import { Modal, Form, InputNumber, Button } from "antd";
import { useCustomerManagement } from "../../stores/useCustomerManagement";

interface DepositModalProps {
  customer: Record<string, any>;
  visible: boolean;
  onCancel: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({
  customer,
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { deposit, loading } = useCustomerManagement();

  const handleDepositSubmit = async (values: { amount: number }) => {
    const { amount } = values;
    await deposit(customer.bankAccount.id, customer.email, amount);
    onCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.resetFields(); // Reset form whenever modal becomes visible
    }
  }, [visible, form]);

  return (
    <Modal
      title="Nạp Tiền"
      open={visible}
      onCancel={handleCancel}
      centered
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleDepositSubmit}
        initialValues={{ amount: undefined }}
      >
        <Form.Item
          label="Số tiền nạp"
          name="amount"
          rules={[
            { required: true, message: "Vui lòng nhập số tiền!" },
            {
              type: "number",
              min: 1,
              max: 10000000,
              message: "Số tiền phải nằm trong khoảng 1 đến 10,000,000!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={1} max={10000000} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Nạp
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepositModal;
