import React, { useEffect, useState } from "react";
import { Button, Flex, Spin, theme, Typography } from "antd";
import useTransactionStore from "../stores/transactionStore";
import { TransactionStatus } from "../transactionType";
import { BankInfoUI, getBankDetails } from "./ViewTransactionDetails";

interface ViewTransactionResultProps {
  onSubmitSuccess: () => void; // Function to trigger step change
}

const ViewTransactionResult: React.FC<ViewTransactionResultProps> = ({
  onSubmitSuccess,
}) => {
  const { token } = theme.useToken();
  const [beneficiaryBank, setBeneficiaryBank] = useState<BankInfoUI | null>(
    null
  );

  const {
    fetchLoading,
    transaction,
    fetchTransaction,
    transactionDetailsRespones,
    banks,
  } = useTransactionStore();

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    width: "55%",
    padding: "20px 40px",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (transaction?.id) {
          fetchTransaction(transaction?.id);
        }
        // await fetchTransaction("39d9cf4b-1c3d-4bf9-b5ba-9de991225355");
      } catch (error) {
        console.error("Có lỗi khi lấy thông tin giao dịch", error);
      }
    };

    fetchData();
  }, []);

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

  if (fetchLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex vertical gap={10} style={contentStyle}>
      <Flex justify="center">
        <img
          src="../src/assets/images/vertical_logo.png"
          alt="Not found!"
          style={{ width: 100, height: 100 }}
        />
      </Flex>
      <Typography.Text
        style={{ fontSize: 18, color: "green", fontWeight: "500" }}
      >
        {transactionDetailsRespones?.status === TransactionStatus.SUCCESS
          ? "Giao dịch thành công"
          : "Giao dịch thất bại"}
      </Typography.Text>
      <Flex gap={5} style={{ marginBottom: "20px" }}>
        <Typography.Text style={{ fontSize: 14 }}>
          Mã giao dịch:{" "}
        </Typography.Text>
        <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
          {transactionDetailsRespones?.id}
        </Typography.Text>
      </Flex>

      <Flex justify="space-between">
        <Typography.Text>Tài khoản nguồn</Typography.Text>
        <Typography.Text>
          {transactionDetailsRespones?.remitterId} -{" "}
          {transactionDetailsRespones?.remitterName}
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
        <Typography.Text>Tài khoản đích</Typography.Text>
        <Typography.Text>
          {" "}
          {transactionDetailsRespones?.beneficiaryId} -{" "}
          {transactionDetailsRespones?.beneficiaryName}
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
        <Typography.Text>Ngân hàng nhận</Typography.Text>
        <Typography.Text>
          {" "}
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
        <Typography.Text style={{ color: "red" }}>
          -{" "}
          {transactionDetailsRespones?.amount.toLocaleString("vi-VN", {
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
        <Typography.Text>Ngân hàng nhận</Typography.Text>
        <Typography.Text>Ngân hàng nhận</Typography.Text>
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
          {transactionDetailsRespones?.remitterPaidFee
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
        <Typography.Text>{transactionDetailsRespones?.message}</Typography.Text>
      </Flex>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #f0f0f0",
          margin: "5px 0",
        }}
      />
      <Flex justify="space-between">
        <Typography.Text>Thời gian</Typography.Text>
        <Typography.Text>
          {transactionDetailsRespones?.createdAt.toLocaleString()}
        </Typography.Text>
      </Flex>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #f0f0f0",
          margin: "5px 0",
        }}
      />

      <Flex justify="flex-end" gap={10}>
        <Button onClick={() => window.location.reload()}>Thêm giao dịch</Button>
        <Button>Lưu người thụ hưởng</Button>
      </Flex>
    </Flex>
  );
};

export default ViewTransactionResult;
