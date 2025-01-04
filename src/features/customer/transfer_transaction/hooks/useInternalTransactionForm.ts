import { useState } from "react";
import { getBankAccountWithUser } from "@services/getBankAccountWithUser";
import useTransactionStore from "../stores/transactionStore";

export const useInternalTransactionForm = () => {
  const { contactList, bankAccountInfo, banks } = useTransactionStore();
  const [beneficiaryName, setBeneficiaryName] = useState<string | null>(null);
  const [beneficiaryId, setBeneficiaryId] = useState<string | undefined>("");
  const [isBeneficiaryNameVisible, setIsBeneficiaryNameVisible] =
    useState(false);
  const [beneficiaryLoading, setBeneficiaryLoading] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  const getBeneficiaryAccount = async (beneficiaryId: string) => {
    try {
      if (bankAccountInfo?.bankId && banks?.length > 0) {
        const matchingBank = banks.find(
          (bank) => bank.id === bankAccountInfo?.bankId
        );

        const result = await getBankAccountWithUser(
          beneficiaryId,
          matchingBank?.code
        );

        if (result) {
          setBeneficiaryName(result.fullName);
          setIsBeneficiaryNameVisible(true);
        } else {
          setBeneficiaryName(null);
          setIsBeneficiaryNameVisible(false);
          setAccountError("Không tìm thấy tài khoản.");
        }
      } else {
        setIsBeneficiaryNameVisible(false);

        setAccountError("Thông tin ngân hàng không hợp lệ.");
      }
    } catch (error) {
      setIsBeneficiaryNameVisible(false);
      setAccountError("Có lỗi xảy ra khi kiểm tra tài khoản.");
    }
  };

  const handleBeneficiaryChange = async (beneficiaryId: string) => {
    setBeneficiaryLoading(true);
    setBeneficiaryId(beneficiaryId);

    if (contactList?.length > 0) {
      const beneficiary = contactList.find(
        (item) => item.beneficiaryId === beneficiaryId
      );

      if (beneficiary) {
        setBeneficiaryName(beneficiary.beneficiaryName);
        setIsBeneficiaryNameVisible(true);
      } else {
        setBeneficiaryName(null);
        // setIsBeneficiaryNameVisible(false);
        await getBeneficiaryAccount(beneficiaryId);
      }
    } else {
      // setBeneficiaryName(null);
      // setIsBeneficiaryNameVisible(false);s

      // Fallback to bank account info if no contact is found
      await getBeneficiaryAccount(beneficiaryId);
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
