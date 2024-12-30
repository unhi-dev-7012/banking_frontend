import React, { useState, useEffect } from "react";
import { Input, message, Dropdown, Button, MenuProps } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useDebtStore } from "@features/customer/debt/stores/debtStore";
import "./AccountInput.css";

interface AccountInputProps {
  setBankAccountId: (id: string) => void; // Callback to set debtor ID in form
  setError: (error: string | null) => void;
  error: string | null;
}

const accountIdValidationRules = [
  { required: true, message: "Trường này không được để trống!" },
  {
    pattern: /^[0-9]+$/, // Only numbers allowed
    message: "Số tài khoản chỉ chứa chữ số",
  },
  {
    min: 8, // Minimum length for account number
    message: "Số tài khoản phải có ít nhất 8 chữ số",
  },
  {
    max: 15, // Maximum length for account number
    message: "Số tài khoản không thể dài hơn 15 chữ số",
  },
];
const AccountInput: React.FC<AccountInputProps> = ({
  setBankAccountId: setDebtorId,
  setError,
  error,
}) => {
  const { debtorList, fetchDebtorList } = useDebtStore();
  const [accountId, setAccountId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Store filtered debtors

  // Fetch debtor list when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDebtorList();
      } catch (error) {
        message.error("Không thể tải danh sách tài khoản.");
      }
    };
    fetchData();
  }, []);

  const filteredDebtors = debtorList.filter((debtor) =>
    `${debtor.debtorId} - ${debtor.debtorFullName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSelectFromDropdown: MenuProps["onClick"] = ({ key }) => {
    const selectedDebtor = debtorList.find((debtor) => debtor.debtorId === key);
    if (selectedDebtor) {
      setDebtorId(selectedDebtor.debtorId); // Gửi ID tài khoản lên form cha
      setAccountId(`${selectedDebtor.debtorId}`); // Cập nhật giá trị input số tài khoản
      setError("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn ngừa submit form khi nhấn Enter
    }
  };

  // Xử lý khi người dùng nhập tay vào input số tài khoản
  const handleAccountIdChange = (value: string) => {
    setAccountId(value);
    setError("");
  };

  const handleAccountBlur = async () => {
    // Check validation rules for account ID
    for (const rule of accountIdValidationRules) {
      const { required, pattern, min, max, message } = rule;
      if (required && accountId.trim() === "") {
        setError(message); // Show error if field is empty
        return;
      }
      if (pattern && !pattern.test(accountId)) {
        setError(message); // Show error if accountId doesn't match pattern
        return;
      }
      if (min && accountId.length < min) {
        setError(message); // Show error if accountId is too short
        return;
      }
      if (max && accountId.length > max) {
        setError(message); // Show error if accountId is too long
        return;
      }
    }

    setDebtorId(accountId); // Set debtor ID in parent form
  };
  const items: MenuProps["items"] = [
    {
      key: "search",
      label: (
        <Input
          placeholder="Tìm kiếm tài khoản"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%" }}
        />
      ),
      disabled: true, // Không cho phép chọn mục này
    },
    ...filteredDebtors.map((debt) => ({
      label: `${debt.debtorId} - ${debt.debtorFullName}`,
      key: debt.debtorId,
      icon: <UserOutlined />,
    })),
  ];

  const menuProps = {
    items,
    onClick: handleSelectFromDropdown,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          border: "1px solid #d9d9d9",
          borderRadius: "6px",
          padding: "2px",
          position: "relative",
        }}
      >
        <Input
          onKeyDown={handleKeyDown}
          value={accountId}
          onFocus={() => setError("")}
          onBlur={handleAccountBlur}
          onPressEnter={handleAccountBlur}
          onChange={(e) => handleAccountIdChange(e.target.value)}
          placeholder="Vui lòng nhập số tài khoản hoặc chọn trong danh sách"
          style={{ flex: 1 }}
          variant="borderless"
        />

        {/* Display error below input */}
        <Dropdown menu={menuProps} trigger={["click"]} placement="bottomRight">
          <Button type="text" icon={<DownOutlined />}></Button>
        </Dropdown>
      </div>
      {error && (
        <div
          style={{
            color: "#ff4d4f",
            fontSize: "14px",
            position: "absolute", // Absolute positioning
            top: "100%", // Position directly below the input field
            left: 0,
            width: "100%", // Make sure error div spans the full width
            marginTop: "4px",
          }}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default AccountInput;
