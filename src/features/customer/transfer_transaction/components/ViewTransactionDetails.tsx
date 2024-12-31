import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input, message, theme, Typography } from "antd";
import useTransactionStore from "../stores/transactionStore";
import { Bank, VerifyOtpPayload } from "../transactionType";

import styles from "@screens/authentication/login/login.module.css";
import Countdown from "antd/es/statistic/Countdown";
import { Navigate } from "react-router-dom";
import { ROUTES_PATH } from "@constants/path";

interface ViewTransactionFormProps {
  onSubmitSuccess: () => void; // Function to trigger step change
}

export interface BankInfoUI {
  bankCode: string | undefined;
  bankName: string | undefined;
  bankShortName: string | undefined;
}

export function getBankDetails(banks: Bank[], bankId: string): BankInfoUI {
  const bank = banks.find((b) => b.id === bankId);
  if (bank) {
    return {
      bankCode: bank.code,
      bankName: bank.name,
      bankShortName: bank.shortName,
    };
  } else {
    // Return undefined if no bank is found for the given bankId
    return {
      bankCode: undefined,
      bankShortName: undefined,
      bankName: undefined,
    };
  }
}

const ViewTransactionForm: React.FC<ViewTransactionFormProps> = ({
  onSubmitSuccess,
}) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const [otp, setOtp] = useState<string>("");

  const {
    verifyLoading,
    transaction,
    fetchError,
    verifyOtp,
    bankAccountInfo,
    banks,
  } = useTransactionStore();

  const [beneficiaryBank, setBeneficiaryBank] = useState<BankInfoUI | null>(
    null
  );

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const onFinish = async (values: VerifyOtpPayload) => {
    try {
      if (transaction) values.id = transaction.id;
      values.otp = otp;
      console.log("values", values);
      await verifyOtp(values);
      onSubmitSuccess();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (transaction) {
      const beneficiaryBankDetails = getBankDetails(
        banks,
        transaction?.beneficiaryBankId
      );
      // Only update if the beneficiartBank details have changed
      if (
        JSON.stringify(beneficiaryBank) !==
        JSON.stringify(beneficiaryBankDetails)
      ) {
        setBeneficiaryBank(beneficiaryBankDetails);
      }
    }
  }, [transaction, banks, beneficiaryBank]);

  const handleCountdownFinish = () => {
    window.location.reload();
  };

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    width: "55%",
    padding: "20px",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
  };

  return (
    <Flex vertical gap={10} style={contentStyle}>
      <Typography.Title
        level={4}
        style={{ margin: "5px 0 5px 0px", textAlign: "left" }}
      >
        Từ tài khoản
      </Typography.Title>
      <Flex justify="space-between">
        <Typography.Text style={{ fontSize: 16 }}>
          Số tài khoản tài khoản
        </Typography.Text>
        <Flex
          vertical
          style={{
            width: "453px",
            border: "1px solid #cddcec",
            borderRadius: "4px",
            padding: "5px 20px",
          }}
        >
          <Flex justify="space-between">
            <Typography.Text style={{ fontSize: 16 }}>
              {transaction?.remitterId}
            </Typography.Text>
            <Typography.Text style={{ fontSize: 16 }}>-</Typography.Text>
            <Typography.Text style={{ fontSize: 16 }}>
              {transaction?.remitterName}
            </Typography.Text>
          </Flex>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f0f0f0",
              margin: "8px 0",
            }}
          />
          <Flex justify="space-between">
            <Typography.Text>Số dư khả dụng</Typography.Text>
            <Typography.Text style={{ color: "#1677ff" }}>
              {bankAccountInfo?.balance.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
      <Typography.Title
        level={4}
        style={{ margin: "0px 0 5px 0px", textAlign: "left" }}
      >
        Đến tài khoản
      </Typography.Title>

      <Flex justify="space-between">
        <Typography.Text>Tên người nhận</Typography.Text>
        <Typography.Text>{transaction?.beneficiaryName}</Typography.Text>
      </Flex>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #f0f0f0",
          margin: "5px 0",
        }}
      />

      <Flex justify="space-between">
        <Typography.Text>Ngân hàng nhận</Typography.Text>
        <Typography.Text>
          {beneficiaryBank?.bankShortName}_{beneficiaryBank?.bankName}_
          {beneficiaryBank?.bankCode}
        </Typography.Text>
      </Flex>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #f0f0f0",
          margin: "5px 0",
        }}
      />

      <Flex justify="space-between">
        <Typography.Text>Số tiền giao dịch</Typography.Text>
        <Typography.Text>
          {transaction?.amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Typography.Text>
      </Flex>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #f0f0f0",
          margin: "5px 0",
        }}
      />

      <Flex justify="space-between">
        <Typography.Text>Hình thức tính phí</Typography.Text>
        <Typography.Text>
          {transaction?.remitterPaidFee
            ? "Người gửi trả phí"
            : "Người nhận trả phi"}
        </Typography.Text>
      </Flex>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #f0f0f0",
          margin: "5px 0",
        }}
      />

      <Flex justify="space-between">
        <Typography.Text>Nội dung</Typography.Text>
        <Typography.Text>{transaction?.message}</Typography.Text>
      </Flex>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #f0f0f0",
          margin: "5px 0",
        }}
      />

      <Form
        layout="vertical"
        form={form}
        name="verify_otp"
        onFinish={onFinish}
        style={{ marginTop: 5 }}
        requiredMark={false}
      >
        <Flex vertical justify="center" align="center" gap={10}>
          <Typography.Text style={{ fontSize: 18, fontWeight: 500 }}>
            Quý khách vui lòng nhập OTP để xác thực giao dịch
          </Typography.Text>
          <Form.Item
            style={{ marginBottom: 20 }}
            name="otp"
            rules={[{ required: true, message: "Không được để trống OTP" }]}
          >
            <div className={styles.inputOTP}>
              <Input.OTP
                onChange={handleChange}
                formatter={(str) => str.replace(/\D/g, "")}
                style={{ marginBottom: "5px" }}
              />
            </div>
          </Form.Item>
          <Flex align="center" gap={5}>
            <Typography.Text style={{ fontWeight: 400 }}>
              Thời gian hiệu lực:
            </Typography.Text>
            <div className={styles.countDownContainer}>
              <Countdown
                value={Date.now() + 120000}
                format="mm:ss"
                onFinish={handleCountdownFinish}
              />
            </div>
          </Flex>
        </Flex>

        <Form.Item style={{ marginBottom: "0" }}>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <Button type="primary" htmlType="submit" loading={verifyLoading}>
              {verifyLoading ? "Đang xác thực..." : "Hoàn tất giao dịch"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default ViewTransactionForm;
