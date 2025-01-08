import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useCustomerManagement } from "../../stores/useCustomerManagement";

interface AddCustomerModalProps {
  visible: boolean;
  onCancel: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { createCustomer, error, loading, success } = useCustomerManagement();

  const handleSubmit = async (values: any) => {
    await createCustomer({ ...values, balance: parseInt(values.balance) });
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (error) {
      message.error(error);
    }

    if (success) {
      message.success(success);
    }
  }, [error, success]);

  return (
    <Modal
      title="Thêm khách hàng"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { max: 100, message: "Email không được quá 100 ký tự!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: "Vui lòng nhập username!" },
            { min: 10, message: "Username phải có ít nhất 10 ký tự!" },
            { max: 100, message: "Username không được quá 100 ký tự!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên!" },
            { max: 100, message: "Họ và tên không được quá 100 ký tự!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="balance"
          label="Số dư"
          rules={[{ required: true, message: "Vui lòng nhập số dư!" }]}
        >
          <InputNumber<number>
            style={{ width: "100%" }}
            min={0}
            placeholder="Nhập số tiền"
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            suffix="VND"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Thêm khách hàng
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
