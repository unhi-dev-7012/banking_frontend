import { Button, Form, Input, message } from "antd";
import React from "react";
import { CreateEmployeeForm } from "../employeeType";
import { useEmployeeStore } from "../stores/employeeStore";

const initialValues: CreateEmployeeForm = {
  email: "",
  username: "",
  fullName: "",
};

const messages = {
  notifications: {
    success: "Tài khoản nhân viên đã được tạo thành công",
  },
  validations: {
    emptyField: "Trường này không được để trống!",
    emailFormat: "Vui lòng nhập email hợp lệ",
  },
  form: {
    email: "Email",
    usename: "Tài khoản đăng nhập",
    fullName: "Họ và tên",
    action: "Lưu",
  },
};

interface EmployeeFormProps {
  closeModal: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ closeModal }) => {
  const [form] = Form.useForm();
  const { loading, createEmployee, setLoading } = useEmployeeStore();

  const handleSubmit = async (value: CreateEmployeeForm) => {
    try {
      await createEmployee(value);
      message.success(messages.notifications.success);
      form.resetFields();
      closeModal();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        label={messages.form.email}
        name="email"
        rules={[
          { required: true, message: messages.validations.emptyField },
          { type: "email", message: messages.validations.emailFormat },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={messages.form.usename}
        name="username"
        rules={[{ required: true, message: messages.validations.emptyField }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={messages.form.fullName}
        name="fullName"
        rules={[{ required: true, message: messages.validations.emptyField }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {messages.form.action}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
