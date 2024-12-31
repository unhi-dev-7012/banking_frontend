import React, { useState } from "react";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import useTransactionStore from "../stores/transactionStore";
import { VerifyOtpPayload } from "../transactionType";

import styles from "@screens/authentication/login/login.module.css";
import Countdown from "antd/es/statistic/Countdown";
import { Navigate } from "react-router-dom";
import { ROUTES_PATH } from "@constants/path";

interface ViewTransactionFormProps {
  onSubmitSuccess: () => void; // Function to trigger step change
}

const ViewTransactionForm: React.FC<ViewTransactionFormProps> = ({
  onSubmitSuccess,
}) => {
  const [form] = Form.useForm();

  const { verifyLoading, transaction, verifyOtp } = useTransactionStore();

  const onFinish = async (values: VerifyOtpPayload) => {
    try {
      if (transaction) values.id = transaction.id;
      await verifyOtp(values);
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCountdownFinish = () => {
    return <Navigate to={ROUTES_PATH.CUSTOMER.DASHBOARD} replace />;
  };

  return (
    <Card>
      <Typography.Title level={4}>Từ tài khoản</Typography.Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Text>
          {transaction?.remitterId} - {transaction?.remitterName}
        </Typography.Text>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #f0f0f0",
            margin: "8px 0",
          }}
        />
      </Space>
      <Form
        layout="vertical"
        form={form}
        name="verify_otp"
        onFinish={onFinish}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          label="Nhập OTP"
          name="otp"
          rules={[
            { required: true, message: "Không được để trống OTP" },
            { pattern: /^\d{6}$/, message: "OTP phải gồm 6 chữ số" },
          ]}
        >
          <div className={styles.inputOTP}>
            <Input.OTP
              formatter={(str) => str.replace(/\D/g, "")}
              style={{ marginBottom: "10px" }}
            />
          </div>
        </Form.Item>

        <div className={styles.countDownContainer}>
          <Countdown
            value={Date.now() + 120000}
            format="mm:ss"
            onFinish={handleCountdownFinish}
          />
        </div>

        <Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <Button
              type="text"
              onClick={() => {
                form.resetFields();
              }}
            >
              Làm lại
            </Button>
            <Button type="primary" htmlType="submit" loading={verifyLoading}>
              {verifyLoading ? "Đang xác thực..." : "Hoàn tất giao dịch"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ViewTransactionForm;
