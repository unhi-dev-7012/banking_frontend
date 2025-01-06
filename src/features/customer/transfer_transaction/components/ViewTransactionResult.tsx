import React, { useEffect, useState } from "react";
import { Button, Flex, message, Spin, theme, Typography } from "antd";
import useTransactionStore from "../stores/transactionStore";
import { TransactionStatus, TransactionType } from "../transactionType";
import { BankInfoUI, getBankDetails } from "./ViewTransactionDetails";
import { replace, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "@constants/path";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../../config/firebase";
import { createContact } from "@features/customer/contact/services/createContact";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSaveBeneficiary = async () => {
    setLoading(true);
    try {
      if (!transactionDetailsRespones) return;

      await createContact(
        transactionDetailsRespones.beneficiaryBankId,
        transactionDetailsRespones.beneficiaryId,
        transactionDetailsRespones.beneficiaryName
      );

      message.success("Lưu người thụ hưởng thành công!");
    } catch (error: any) {
      if (error.response) {
        const { status } = error.response;

        switch (status) {
          case 404:
            message.error("Không tìm thấy tài nguyên yêu cầu.");
            break;
          case 400:
            message.error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
            break;
          case 409:
            message.error(
              "Tài khoản này trùng với tài khoản của bạn hoặc đã được thêm."
            );
            break;
          default:
            message.error("Thêm tài khoản thất bại");
            break;
        }
      } else {
        message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (transaction?.id) {
          fetchTransaction(transaction?.id);
        }
      } catch (error) {
        console.error("Có lỗi khi lấy thông tin giao dịch", error);
      }
    };

    onMessage(messaging, (payload) => {
      console.log(payload);
      fetchData();
      console.log(transaction);
    });
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
        style={{
          fontSize: 18,
          color:
            transactionDetailsRespones?.status === TransactionStatus.SUCCESS
              ? "green"
              : transactionDetailsRespones?.status === TransactionStatus.FAILED
              ? "red"
              : "blue",
          fontWeight: "500",
        }}
      >
        {`${
          transactionDetailsRespones?.type === TransactionType.DEBT
            ? "Thanh toán nợ"
            : "Giao dịch"
        } ${
          transactionDetailsRespones?.status === TransactionStatus.SUCCESS
            ? "thành công"
            : transactionDetailsRespones?.status === TransactionStatus.FAILED
            ? "thất bại"
            : "đang xử lý"
        }`}
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
        <Button
          onClick={() => {
            if (transaction?.type === TransactionType.DEBT) {
              navigate(ROUTES_PATH.CUSTOMER.DEBT_LIST, {
                replace: true,
              });
            } else {
              window.location.reload();
            }
          }}
        >
          {transaction?.type === TransactionType.DEBT
            ? "Quay về danh sách nợ"
            : "Thêm giao dịch"}
        </Button>
        <Button loading={loading} onClick={handleSaveBeneficiary}>
          Lưu người thụ hưởng
        </Button>
      </Flex>
    </Flex>
  );
};

export default ViewTransactionResult;
