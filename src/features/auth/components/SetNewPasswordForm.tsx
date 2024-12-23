import React, { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { ArrowLeft, RectangleEllipsis } from "lucide-react";
import styles from "@screens/authentication/login/login.module.css";

interface SetNewPasswordFormProps {
  onBackToLogin: () => void;
  onResetPassword: (
    newPassword: string,
    confirmPassword: string,
    resetToken: string
  ) => void;
  resetToken: string;
}

const { Title } = Typography;

const SetNewPasswordForm: React.FC<SetNewPasswordFormProps> = ({
  onBackToLogin,
  onResetPassword,
  resetToken,
}) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // Password validation
  const validatePassword = () => {
    if (password !== confirmPassword) {
      notification.error({
        message: "Mật khẩu không trùng khớp",
        description: "Mật khẩu bạn nhập không trùng khớp.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validatePassword()) {
      setLoading(true);
      onResetPassword(password, confirmPassword, resetToken);
    }
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
        <RectangleEllipsis size={40} />
      </div>
      <Title level={1} style={{ fontSize: "48px", marginBottom: "10px" }}>
        Đặt Mật Khẩu Mới
      </Title>
      <Form
        layout="vertical"
        size="large"
        name="resetPass"
        style={{ minWidth: 480 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          className={styles.customLabelPass}
          label="Mật khẩu mới"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            {
              min: 8,
              message: "Mật khẩu phải có ít nhất 8 ký tự",
            },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          className={styles.customLabelPass}
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
        >
          <Input.Password
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Đặt lại mật khẩu
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

export default SetNewPasswordForm;
