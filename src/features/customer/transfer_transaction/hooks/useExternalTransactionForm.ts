import { useState } from "react";
import { getBankAccountWithUser } from "@services/getBankAccountWithUser";
import useTransactionStore from "../stores/transactionStore";
import { message } from "antd";

export const useExternalTransactionForm = () => {
  const { contactList, banks } = useTransactionStore();
  const [beneficiaryName, setBeneficiaryName] = useState<string | null>(null);
  const [beneficiaryId, setBeneficiaryId] = useState<string | undefined>("");

  const [beneficiaryLoading, setBeneficiaryLoading] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [bankName, setBankName] = useState<string | null>(null);
  const [bankId, setBankId] = useState<string | undefined>(undefined);

  const handleBeneficiaryChange = async (beneficiaryId: string) => {
    setBeneficiaryLoading(true);
    setBeneficiaryId(beneficiaryId);

    if (contactList?.length > 0) {
      const beneficiary = contactList.find(
        (item) => item.beneficiaryId === beneficiaryId
      );

      if (beneficiary) {
        setBeneficiaryName(beneficiary.beneficiaryName);
        setBankName(
          `${beneficiary.bankShortName}_${beneficiary.bankName}_(${beneficiary.bankCode})`
        );
        setBankId(beneficiary.bankId);
      } else {
        setBeneficiaryName(null);
        try {
          if (bankId && beneficiaryId) {
            if (banks?.length > 0) {
              const matchingBank = banks.find((bank) => bank.id === bankId);

              const result = await getBankAccountWithUser(
                beneficiaryId,
                matchingBank?.code
              );

              if (result) {
                setBeneficiaryName(result.fullName);
                // setBankName(
                //   `${matchingBank?.shortName}_${matchingBank?.name}_(${matchingBank?.code})`
                // );
                setBankId(matchingBank?.id);
              } else {
                setBeneficiaryName(null);
                setBankId(undefined);
                setAccountError("Không tìm thấy tài khoản.");
              }
            } else {
              setAccountError("Không tìm thấy tài khoản ngân hàng.");
            }
          }
        } catch (error: any) {
          // setAccountError("Không tìm thấy tài khoản.");
          console.log("bank id: ", bankId);

          setBeneficiaryName(null);
          setBankId(undefined);
          message.error("Không tìm thấy tài khoản ngân hàng");
        }
      }
    }

    setBeneficiaryLoading(false);
  };

  return {
    beneficiaryName,
    setBeneficiaryName,
    beneficiaryId,
    beneficiaryLoading,
    accountError,
    handleBeneficiaryChange,
    setAccountError,
    bankId,
    setBankId,
    bankName,
    setBankName,
  };
};
