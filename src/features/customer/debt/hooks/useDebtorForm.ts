import { useState } from "react";
import { getBankAccountWithUser } from "@services/getBankAccountWithUser";
import { useDebtStore } from "../stores/debtStore";

export const useDebtorForm = () => {
  const { debtorList } = useDebtStore();
  const [debtorName, setDebtorName] = useState<string | null>(null);
  const [debtorId, setDebtorId] = useState<string | undefined>("");
  const [isDebtorNameVisible, setIsDebtorNameVisible] = useState(false);
  const [debtorLoading, setDebtorLoading] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  const handleDebtorChange = async (debtorId: string) => {
    setDebtorLoading(true);
    setDebtorId(debtorId);

    const debtor = debtorList.find((item) => item.debtorId === debtorId);
    if (debtor) {
      setDebtorName(debtor.debtorFullName);
      setIsDebtorNameVisible(true);
    } else {
      try {
        const result = await getBankAccountWithUser(debtorId);
        if (result) {
          setDebtorName(result.fullName);
          setIsDebtorNameVisible(true);
        } else {
          setDebtorName(null);
          setIsDebtorNameVisible(false);
          setAccountError("Không tìm thấy tài khoản!");
        }
      } catch (error) {
        setAccountError("Có lỗi xảy ra khi kiểm tra tài khoản.");
      }
    }
    setDebtorLoading(false);
  };

  return {
    debtorName,
    debtorId,
    isDebtorNameVisible,
    debtorLoading,
    accountError,
    handleDebtorChange,
    setAccountError,
  };
};
