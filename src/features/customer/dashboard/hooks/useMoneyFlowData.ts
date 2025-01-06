import { useMemo } from "react";
import { Transaction } from "../stores/dashboardStore";

interface ProcessedData {
  groupedData: any[];
  totalTransactionData: any[];
}

const useMoneyFlowData = (
  mode: string,
  transactions: Transaction[]
): ProcessedData => {
  return useMemo(() => {
    const groupedData: any[] = [];
    const totalTransactionData: any[] = [];

    const xAxisLabels: (string | number)[] =
      mode === "monthly"
        ? Array.from({ length: 31 }, (_, index) => index + 1)
        : ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    const updateData = (
      key: string | number,
      amount: number,
      type: string,
      isTotal?: boolean
    ) => {
      const targetArray = isTotal ? totalTransactionData : groupedData;
      const existingEntry = targetArray.find(
        (data) => data.time === key && data.type === type
      );

      if (existingEntry) {
        existingEntry.value = (existingEntry.value || 0) + amount;
        if (isTotal) existingEntry.count += 1;
      } else {
        targetArray.push(
          isTotal
            ? { time: key, count: 1, type }
            : { time: key, value: amount, type }
        );
      }
    };

    transactions.forEach((transaction) => {
      if (transaction.status !== "success") return;

      const transactionDate = new Date(transaction.date);
      const key =
        mode === "monthly"
          ? transactionDate.getDate()
          : xAxisLabels[transactionDate.getDay()];
      const amount =
        transaction.category === "outcoming" || transaction.category === "debt"
          ? Math.abs(transaction.amount)
          : transaction.amount;

      if (transaction.category === "incoming") {
        updateData(key, amount, "Tiền vào");
      } else if (
        transaction.category === "outcoming" ||
        transaction.category === "debt"
      ) {
        updateData(key, amount, "Tiền ra");
      }

      updateData(key, 0, "Tổng số giao dịch", true); // Increment transaction count
    });

    // Sort data
    const sortData = (a: any, b: any) =>
      xAxisLabels.indexOf(a.time) - xAxisLabels.indexOf(b.time);

    return {
      groupedData: groupedData.sort(sortData),
      totalTransactionData: totalTransactionData.sort(sortData),
    };
  }, [mode, transactions]);
};

export default useMoneyFlowData;
