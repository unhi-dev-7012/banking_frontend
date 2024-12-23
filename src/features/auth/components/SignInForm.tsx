import React from "react";
import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA
import { Button, Flex, Form, Input, Typography } from "antd";
import { SignInFormValues } from "../autTypes";

import styles from "@screens/authentication/login/login.module.css";

interface SignInFormProps {
  onFinish: (value: SignInFormValues) => void;
  loading?: boolean;
  onForgotPassword: () => void; // Add this prop
  recaptchaRef: React.RefObject<ReCAPTCHA>; // Add ref prop
}

type FieldType = {
  username?: string;
  password?: string;
};

const SignInForm: React.FC<SignInFormProps> = ({
  onFinish,
  loading,
  onForgotPassword,
  recaptchaRef,
}) => (
  <>
    <Typography.Title
      level={1}
      style={{ fontSize: "48px", marginBottom: "10px" }}
    >
      Chào mừng trở lại
    </Typography.Title>
    <Typography.Text
      style={{ fontSize: "18px", color: "#b2b2b2", marginBottom: "20px" }}
    >
      Hãy nhập vào tên đăng nhập và mật khẩu để truy cập vào tài khoản
    </Typography.Text>
    <Form
      layout="vertical"
      size="large"
      requiredMark={false}
      name="signin"
      style={{ minWidth: 300 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        className={styles.customLabelName}
        label="Tên đăng nhập"
        name="username"
        rules={[
          {
            required: true,
            message: "Hãy nhập vào tên đăng nhập của bạn!",
          },
        ]}
      >
        <Input placeholder="Tên đăng nhập" />
      </Form.Item>

      <Form.Item<FieldType>
        className={styles.customLabelPass}
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Hãy nhập vào mật khẩu của bạn!" }]}
      >
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Flex justify="flex-end" align="center">
          <Button type="link" onClick={onForgotPassword}>
            Quên mật khẩu?
          </Button>
        </Flex>
      </Form.Item>

      <Form.Item
        style={{
          display: "flex", // Make the Form.Item a flex container
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically (optional based on your layout)
        }}
      >
        <ReCAPTCHA sitekey={import.meta.env.VITE_SITE_KEY} ref={recaptchaRef} />
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ height: "45px" }}
        >
          Đăng nhập
        </Button>
      </Form.Item>

      {/* <Form.Item label={null}>
      <Button type="primary" htmlType="submit" loading={loading}>
        Login
      </Button>
    </Form.Item> */}
    </Form>
  </>
);

export default SignInForm;
