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
    usernameLength: "Tên đăng nhập phải có đúng 10 ký tự",
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
  const { loading, createEmployee, setLoading, fetchTableData } =
    useEmployeeStore();

  const handleSubmit = async (value: CreateEmployeeForm) => {
    try {
      await createEmployee(value);
      message.success(messages.notifications.success);
      form.resetFields();
      await fetchTableData();
      closeModal();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
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
        rules={[
          { required: true, message: messages.validations.emptyField },
          {
            validator: (_, value) =>
              value && value.length === 10
                ? Promise.resolve()
                : Promise.reject(
                    new Error(messages.validations.usernameLength)
                  ),
          },
        ]}
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
