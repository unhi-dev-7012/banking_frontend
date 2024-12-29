import { Button, Form, Input, InputNumber, message, Spin } from "antd";
import React, { useState } from "react";
import { useDebtStore } from "../stores/debtStore";
import { CreateDebtFormValue } from "../debtType";
import AccountInput from "@components/common/autocomplete/AccountInput";
import { getBankAccountWithUser } from "@services/getBankAccountWithUser";

const initialValues: CreateDebtFormValue = {
  debtorId: "",
  fullname: "",
  amount: 0,
  message: "",
};

export const messages = {
  notifications: {
    success: "Nợ đã được tạo thành công",
  },
  validations: {
    emptyField: "Trường này không được để trống!",
    positiveAmount: "Số tiền phải lớn hơn 0",
  },
  form: {
    debtorAccountId: "Số tài khoản người nhận nợ",
    debtorAccountName: "Tên tài khoản người nhận nợ",
    amount: "Số tiền",
    message: "Lời nhắn (tùy chọn)",
    action: "Tạo nợ",
  },
};

interface DebtFormProps {
  closeModal: () => void;
}

const CreateDebtForm: React.FC<DebtFormProps> = ({ closeModal }) => {
  const [form] = Form.useForm();
  const { createDebt, loading, debtorList, setLoading } = useDebtStore();
  const [debtorName, setDebtorName] = useState<string | null>(null);
  const [isDebtorNameVisible, setIsDebtorNameVisible] = useState(false);

  const [debtorLoading, setDebtorLoading] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  const [debtorId, setDebtorId] = useState<string | undefined>("");

  const handleDebtorChange = async (debtorId: string) => {
    // Chỉ thay đổi khi người dùng nhập xong tài khoản và nhấn Enter hoặc blur.
    setDebtorLoading(true);
    setDebtorId(debtorId);

    const debtor = debtorList.find((item) => item.debtorId === debtorId);
    if (debtor) {
      setDebtorName(debtor.debtorFullName); // Cập nhật tên người nhận nợ
      setIsDebtorNameVisible(true); // Hiển thị tên người nhận nợ
    } else {
      try {
        const result = await getBankAccountWithUser(debtorId);
        if (result) {
          setDebtorName(result.fullname);
          setIsDebtorNameVisible(true);
        } else {
          message.error("Không tìm thấy tài khoản!");
          setDebtorName(null);
          setIsDebtorNameVisible(false);
        }
      } catch (error) {
        message.error("Có lỗi xảy ra khi kiểm tra tài khoản.");
      }
    }
    setDebtorLoading(false);
    form.setFieldsValue({ debtorAccountId: debtorId }); // Đặt giá trị vào form
  };

  const onFinish = async (values: CreateDebtFormValue) => {
    if (debtorId) values.debtorId = debtorId;
    if (accountError) {
      return; // Prevent form submission
    }
    try {
      setLoading(true);
      await createDebt(values);
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="create_debt_form"
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
    >
      {/* Debtor Account (Dropdown / Input) */}
      <Form.Item label="Số tài khoản người nhận nợ" name="debtorAccountId">
        <AccountInput
          setError={setAccountError}
          setDebtorId={handleDebtorChange}
          error={accountError}
        />
      </Form.Item>

      {/* Debtor Name (conditionally visible) */}
      {isDebtorNameVisible && (
        <Form.Item label="Tên người nhận nợ">
          <Input value={debtorName || ""} disabled />
          {debtorLoading && (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}{" "}
          {/* Loading spinner */}
        </Form.Item>
      )}

      {/* Amount */}
      <Form.Item
        label={messages.form.amount}
        name="amount"
        rules={[
          { required: true, message: messages.validations.emptyField },
          {
            type: "number",
            min: 1,
            message: messages.validations.positiveAmount,
          },
        ]}
      >
        <InputNumber
          placeholder="Nhập số tiền"
          style={{ width: "100%" }}
          min={1}
        />
      </Form.Item>

      {/* Suggested amounts */}
      <div style={{ marginBottom: 16 }}>
        <Button
          style={{ marginRight: 8 }}
          onClick={() => form.setFieldsValue({ amount: 10000 })}
        >
          10,000
        </Button>
        <Button
          style={{ marginRight: 8 }}
          onClick={() => form.setFieldsValue({ amount: 50000 })}
        >
          50,000
        </Button>
        <Button onClick={() => form.setFieldsValue({ amount: 100000 })}>
          100,000
        </Button>
      </div>

      {/* Message */}
      <Form.Item label={messages.form.message} name="message">
        <Input.TextArea placeholder="Nhập lời nhắn (tùy chọn)" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading} // Show loading spinner when creating debt
        >
          {loading ? "Đang tạo..." : messages.form.action}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateDebtForm;
