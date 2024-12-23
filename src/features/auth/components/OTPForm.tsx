import React, { useState } from "react";
import { Input, Typography, Button, Statistic, Flex, message } from "antd";
import { ArrowLeft, MailOpen } from "lucide-react";
import styles from "@screens/authentication/login/login.module.css";
import requestResetPassword from "../services/requestResetPassword";
import verifyOtp from "../services/verifyOtp";

const { Countdown } = Statistic;
interface OTPFormProps {
  onBackToLogin: () => void;
  onContinue: (resetToken: string) => void;
  userId: string | null;
  email: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  onBackToLogin,
  onContinue,
  userId,
  email,
}) => {
  const [otp, setOtp] = React.useState<string>("");
  const [deadline, setDeadline] = useState<number>(Date.now() + 300000); // 5 phút từ thời điểm hiện tại
  const [resendEnabled, setResendEnabled] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  // Handle OTP input changes
  const handleChange = (value: string) => {
    setOtp(value);
  };

  const handleContinue = async () => {
    if (otp.length !== 6) {
      messageApi.error("Mã OTP phải đủ 6 ký tự.");
      return;
    }
    if (userId) {
      setLoading(true); // Start loading
      try {
        const response = await verifyOtp(userId, otp);
        const resetToken = response.resetToken;
        messageApi.success("OTP xác thực thành công!");
        onContinue(resetToken);
      } catch (error: any) {
        messageApi.error("Mã OTP không hợp lệ. Vui lòng thử lại.");
      } finally {
        setLoading(false); // Stop loading after completion
      }
    } else {
      messageApi.error("Không tìm thấy thông tin người dùng.");
    }
  };

  const handleResendOTP = async () => {
    setLoading(true); // Start loading for resend action
    setDeadline(Date.now() + 300000); // Reset countdown
    setResendEnabled(false); // Disable resend until countdown finishes

    try {
      const response = await requestResetPassword(email);
      userId = response.userId;
      messageApi.success("Mã OTP đã được gửi lại đến email của bạn!");
    } catch (error: any) {
      messageApi.error(error.message);
    } finally {
      setLoading(false); // Stop loading after resend action
    }
  };
  const handleCountdownFinish = () => {
    setResendEnabled(true);
  };

  return (
    <>
      {contextHolder}
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
        Mã OTP đã được gửi đến{" "}
        <Typography.Text style={{ fontSize: "18px", fontWeight: 500 }}>
          {email}
        </Typography.Text>
      </Typography.Text>
      <div className={styles.inputOTP}>
        <Input.OTP
          onChange={handleChange}
          formatter={(str) => str.replace(/\D/g, "")}
          style={{ marginBottom: "10px" }}
        />
      </div>

      <Button
        loading={loading}
        type="primary"
        onClick={handleContinue}
        style={{ width: "50%", height: "45px" }}
      >
        Tiếp tục
      </Button>

      <Flex
        align="center"
        justify="space-around"
        gap="1px"
        className={styles.sendOTPAgainContainer}
      >
        <Typography.Text
          style={{
            fontSize: "16px",
          }}
        >
          Không nhận được email?{" "}
        </Typography.Text>

        <Button
          type="link"
          onClick={handleResendOTP}
          disabled={!resendEnabled}
          loading={loading} // Show loading state when resending OTP
          style={{
            padding: 0,
            color: resendEnabled ? "#1890ff" : "#b2b2b2",
            cursor: resendEnabled ? "pointer" : "not-allowed",
          }}
        >
          Gửi lại OTP
        </Button>
        <div className={styles.countDownContainer}>
          <Countdown
            value={deadline}
            format="mm:ss"
            onFinish={handleCountdownFinish}
          />
        </div>
      </Flex>

      <Button block onClick={onBackToLogin} type="link">
        <ArrowLeft size={20} style={{ marginRight: "8px" }} />
        Trở về trang đăng nhập
      </Button>
    </>
  );
};

export default OTPForm;
