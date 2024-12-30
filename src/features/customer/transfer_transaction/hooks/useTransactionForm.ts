import { useState } from "react";
import { getBankAccountWithUser } from "@services/getBankAccountWithUser";
import useTransactionStore from "../stores/transactionStore";

export const useTransactionForm = () => {
  const { contactList } = useTransactionStore();
  const [beneficiaryName, setBeneficiaryName] = useState<string | null>(null);
  const [beneficiaryId, setBeneficiaryId] = useState<string | undefined>("");
  const [isBeneficiaryNameVisible, setIsBeneficiaryNameVisible] =
    useState(false);
  const [beneficiaryLoading, setBeneficiaryLoading] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  const handleBeneficiaryChange = async (beneficiaryId: string) => {
    setBeneficiaryLoading(true);
    setBeneficiaryId(beneficiaryId);

    const beneficiary = contactList.find(
      (item) => item.beneficiaryId === beneficiaryId
    );
    if (beneficiary) {
      setBeneficiaryName(beneficiary.beneficiaryName);
      setIsBeneficiaryNameVisible(true);
    } else {
      try {
        const result = await getBankAccountWithUser(beneficiaryId);
        if (result) {
          setBeneficiaryName(result.fullName);
          setIsBeneficiaryNameVisible(true);
        } else {
          setBeneficiaryName(null);
          setIsBeneficiaryNameVisible(false);
          setAccountError("Không tìm thấy tài khoản!");
        }
      } catch (error) {
        setAccountError("Có lỗi xảy ra khi kiểm tra tài khoản.");
      }
    }
    setBeneficiaryLoading(false);
  };

  return {
    beneficiaryName,
    beneficiaryId,
    isBeneficiaryNameVisible,
    beneficiaryLoading,
    accountError,
    handleBeneficiaryChange,
    setAccountError,
  };
};
