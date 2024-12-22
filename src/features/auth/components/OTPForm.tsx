import React from "react";
import { Input, Typography, Button, Alert } from "antd";
import { ArrowLeft, MailOpen } from "lucide-react";
import styles from "@screens/authentication/login/login.module.css";

interface OTPFormProps {
  onBackToLogin: () => void;
  onContinue: () => void;
  email: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  onBackToLogin,
  onContinue,
  email,
}) => {
  const [otp, setOtp] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  // Handle OTP input changes
  const handleChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setError(""); // Clear error if input is valid
    }
  };

  const handleContinue = () => {
    if (otp.length !== 6) {
      setError("Mã OTP phải đủ 6 ký tự.");
      return;
    }
    setError("");
    onContinue(); // Proceed if valid
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
        <MailOpen size={40} />
      </div>
      <Typography.Title
        level={1}
        style={{ fontSize: "48px", marginBottom: "10px" }}
      >
        Đặt lại mật khẩu
      </Typography.Title>
      <Typography.Text
        style={{ fontSize: "18px", color: "#b2b2b2", marginBottom: "20px" }}
      >
        Mã OTP đã được gửi đến {email}
      </Typography.Text>
      <div className={styles.inputOTP}>
        <Input.OTP
          onChange={handleChange}
          formatter={(str) => str.replace(/\D/g, "")}
          style={{ marginBottom: "10px" }}
        />
        {error && <Alert type="error" message={error} showIcon />}
      </div>

      <Button
        type="primary"
        onClick={handleContinue}
        style={{ width: "50%", height: "45px" }}
      >
        Tiếp tục
      </Button>

      <Button block onClick={onBackToLogin} type="link">
        <ArrowLeft size={20} style={{ marginRight: "8px" }} />
        Trở về trang đăng nhập
      </Button>
    </>
  );
};

export default OTPForm;
