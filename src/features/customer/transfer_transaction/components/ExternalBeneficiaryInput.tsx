import { useEffect, useState } from "react";
import useTransactionStore from "../stores/transactionStore";
import { Button, Dropdown, Input, MenuProps, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

interface ExternalBeneficiaryInputProps {
  setBankAccountId: (id: string) => void;
  // setBankId: (id: string) => void;
  setError: (error: string | null) => void;
  error: string | null;
  // onSelectBank: (bankId: string) => void;
}

const ExternalBeneficiaryInput: React.FC<ExternalBeneficiaryInputProps> = ({
  // setBankId,
  setBankAccountId,
  setError,
  error,
  // onSelectBank,
}) => {
  const { contactList, fetchAllContact } = useTransactionStore();
  const [accountId, setAccountId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await fetchAllContact();
      } catch {
        message.error("Không thể tải danh sách người thụ hưởng.");
      }
    };

    fetchContacts();
  }, [fetchAllContact]);

  let filteredContacts: any[] = [];
  if (contactList?.length > 0) {
    filteredContacts = contactList.filter((contact) =>
      `${contact.beneficiaryId} - ${contact.beneficiaryName} - ${contact.nickname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  const handleSelectFromDropdown: MenuProps["onClick"] = ({ key }) => {
    const selectedContact = contactList.find(
      (contact) => contact.beneficiaryId === key
    );
    if (selectedContact) {
      setBankAccountId(selectedContact.beneficiaryId);
      // setBankId(selectedContact.bankId);
      setAccountId(`${selectedContact.beneficiaryId}`);
      // onSelectBank(selectedContact.bankId);
      setError(null);
    }
  };

  // Fallback message if there are no contacts
  const noContactsMessage = "Không có người thụ hưởng nào. Vui lòng thêm mới.";

  const handleAccountIdChange = (value: string) => {
    setAccountId(value);
    setError(null);
  };

  const handleAccountBlur = () => {
    if (!accountId) {
      setError("Trường này không được để trống!");
      return;
    }
    setBankAccountId(accountId);
  };

  const items: MenuProps["items"] = [
    {
      key: "search",
      label: (
        <Input
          placeholder="Tìm kiếm người thụ hưởng"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%" }}
        />
      ),
      disabled: true,
    },
    ...(filteredContacts?.length
      ? filteredContacts.map((contact) => ({
          key: contact.beneficiaryId,
          label: (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{`${contact.beneficiaryId} - ${contact.beneficiaryName} (${contact.nickname})`}</span>
              <span
                style={{ fontSize: "12px", color: "gray" }}
              >{`(${contact.bankShortName}_${contact.bankName} (${contact.bankCode}))`}</span>
            </div>
          ),
          icon: <UserOutlined />,
        }))
      : [
          {
            key: "no-contact",
            label: <div>{noContactsMessage}</div>,
            disabled: true,
          },
        ]),
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
          padding: "4px",
        }}
      >
        <Input
          value={accountId}
          onBlur={handleAccountBlur}
          onChange={(e) => handleAccountIdChange(e.target.value)}
          placeholder="Nhập số tài khoản hoặc chọn trong danh sách"
          style={{ flex: 1 }}
          variant="borderless"
        />
        <Dropdown menu={menuProps} trigger={["click"]} placement="bottomRight">
          <Button type="text" icon={<DownOutlined />}></Button>
        </Dropdown>
      </div>
      {error && (
        <div
          style={{
            color: "#ff4d4f",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default ExternalBeneficiaryInput;
