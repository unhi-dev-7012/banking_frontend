import React, { useState } from "react";
import { useEmployeeStore } from "../stores/employeeStore";
import { Button, Form, Input, message, Modal } from "antd";
import { CreateEmployeeForm } from "../employeeType";

const EmployeeForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { loading, createEmployee, setLoading, listEmployees } =
    useEmployeeStore();

  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleSubmit = async (value: CreateEmployeeForm) => {
    try {
      await createEmployee(value);
      await listEmployees();
      message.success("Tài khoản nhân viên đã được tạo thành cộng");
      setVisible(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Tạo tài khoản nhân viên
      </Button>

      <Modal
        title="Tạo tài khoản nhân viên mới"
        open={visible}
        onCancel={hideModal}
        footer={null}
      >
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ email: "", username: "", fullName: "" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Trường này không thể để trống!" },
              { type: "email", message: "Hãy nhập vào email hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input the full name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeForm;
