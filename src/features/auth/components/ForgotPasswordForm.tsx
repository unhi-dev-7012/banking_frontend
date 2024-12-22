import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { ArrowLeft, Fingerprint, Mail } from "lucide-react";
import styles from "@screens/authentication/login/login.module.css";

interface ForgotPasswordFormProps {
  loading?: boolean;
  onBackToLogin: () => void; // Added prop to handle back to login
  onResetPassword: (email: string) => void;
}

const validateMessages = {
  required: "${label} không được để trống!",
  types: {
    email: "${label} không đúng định dạng!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  loading,
  onBackToLogin,
  onResetPassword,
}) => {
  const handleSubmit = (values: { email: string }) => {
    // Call onResetPassword with email if valid
    onResetPassword(values.email);
  };
  return (
    <>
      <div
        style={{
          border: "3px solid #f4f4f4",
          padding: "10px",
          borderRadius: "16px",
        }}
      >
        <Fingerprint size={40} />
      </div>
      <Typography.Title
        level={1}
        style={{ fontSize: "48px", marginBottom: "10px" }}
      >
        Quên mật khẩu?
      </Typography.Title>
      <Typography.Text
        style={{ fontSize: "18px", color: "#b2b2b2", marginBottom: "20px" }}
      >
        Đừng lo lắng, chúng tôi sẽ gửi bạn OTP để reset mật khẩu!
      </Typography.Text>
      <Form
        layout="vertical"
        size="large"
        requiredMark={false}
        name="forgot"
        style={{ minWidth: 480 }}
        onFinish={handleSubmit}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"email"}
          label="Email"
          rules={[{ required: true, type: "email" }]}
          className={styles.customLabelEmail}
        >
          <Input
            prefix={<Mail />}
            placeholder="example@gmail.com"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ height: "45px" }}
          >
            Đăt lại mật khẩu
          </Button>
        </Form.Item>
        <Button block onClick={onBackToLogin} type="link">
          <ArrowLeft size={20} style={{ marginRight: "8px" }} />
          Trở về trang đăng nhập
        </Button>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
