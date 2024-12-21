import React from "react";
import { Button, Form, Input } from "antd";
import { SignInFormValues } from "../autTypes";

interface SignInFormProps {
  onFinish: (value: SignInFormValues) => void;
  loading?: boolean;
}

type FieldType = {
  username?: string;
  password?: string;
};

const SignInForm: React.FC<SignInFormProps> = ({ onFinish, loading }) => (
  <Form
    name="signin"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" loading={loading}>
        Login
      </Button>
    </Form.Item>
  </Form>
);

export default SignInForm;
