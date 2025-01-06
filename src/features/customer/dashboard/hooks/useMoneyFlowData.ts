import { useMemo } from "react";
import { MoneyFlowData, MoneyFlowItem } from "../stores/dashboardStore";

interface ProcessedData {
  totalTransactionData: any[];
  groupedData: any[];
  // xAxisLabels: (string | number)[];
}

const useMoneyFlowData = (mode: string, data: MoneyFlowData): ProcessedData => {
  console.log("here", data);
  const getWeekdayLabel = (dateString: string) => {
    const dateParts = dateString.split("/");
    const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
    const dayIndex = date.getDay();
    const dayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return dayLabels[dayIndex];
  };

  const getDayOfMonth = (dateString: string) => {
    const dateParts = dateString.split("/");
    return parseInt(dateParts[0], 10);
  };

  const groupedData = useMemo(() => {
    const incoming = data?.byCategory.totalIncoming || [];
    const outgoing = data?.byCategory.totalOutcoming || [];
    const result: MoneyFlowItem[] = [];

    incoming.forEach((entry, index) => {
      const timeLabel =
        mode === "monthly"
          ? getDayOfMonth(entry.time)
          : getWeekdayLabel(entry.time);

      result.push({
        time: timeLabel.toString(),
        value: entry.value,
        type: "Tiền vào",
      });
      result.push({
        time: timeLabel.toString(),
        value: outgoing[index]?.value || 0, // Ensure no undefined value
        type: "Tiền ra",
      });
    });

    return result;
  }, [mode, data]);

  const totalTransactionData = useMemo(() => {
    return (
      data?.totalTransactionData?.map((entry) => {
        const timeLabel =
          mode === "monthly"
            ? getDayOfMonth(entry.time)
            : getWeekdayLabel(entry.time);

        return {
          time: timeLabel.toString(),
          count: entry.value,
          type: "Tổng số giao dịch",
        };
      }) || []
    );
  }, [mode, data]);

  return { groupedData, totalTransactionData };
};

export default useMoneyFlowData;
