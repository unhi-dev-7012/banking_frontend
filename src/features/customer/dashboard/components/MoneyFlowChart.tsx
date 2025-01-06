import React from "react";
import { DualAxes } from "@ant-design/plots";
import { Transaction } from "../stores/dashboardStore";

interface MoneyFlowChartProps {
  mode: string;
  transactions: Transaction[];
}

const MoneyFlowChart: React.FC<MoneyFlowChartProps> = ({
  mode,
  transactions,
}) => {
  const processData = () => {
    console.log("group", transactions);
    const groupedData: any[] = [];
    const totalTransactionData: any[] = [];

    const xAxisLabels: (string | number)[] =
      mode === "monthly"
        ? Array.from({ length: 31 }, (_, index) => index + 1)
        : ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    if (mode === "monthly") {
      // Group transactions by day of the month
      transactions.forEach((transaction) => {
        if (transaction.status !== "success") return; // Skip if status is not 'success'

        const transactionDate = new Date(transaction.date);
        const dayOfMonth = transactionDate.getDate(); // getDate() gives the day of the month (1-31)

        // Find existing entries for incoming and outcoming categories
        const existingIncoming = groupedData.find(
          (data) =>
            data.time === xAxisLabels[dayOfMonth - 1] &&
            data.type === "incoming"
        );
        const existingOutcoming = groupedData.find(
          (data) =>
            data.time === xAxisLabels[dayOfMonth - 1] &&
            (data.type === "outcoming" || data.type === "debt")
        );
        const existingTotal = totalTransactionData.find(
          (data) => data.time === xAxisLabels[dayOfMonth - 1]
        );

        const amount =
          transaction.category === "outcoming" ||
          transaction.category === "debt"
            ? Math.abs(transaction.amount)
            : transaction.amount;

        // Update incoming or outcoming amounts
        if (transaction.category === "incoming") {
          if (existingIncoming) {
            existingIncoming.value += amount;
          } else {
            groupedData.push({
              time: xAxisLabels[dayOfMonth - 1],
              value: amount,
              type: "Tiền vào",
            });
          }
        } else if (
          transaction.category === "outcoming" ||
          transaction.category === "debt"
        ) {
          if (existingOutcoming) {
            existingOutcoming.value += amount;
          } else {
            console.log("here", transaction);
            groupedData.push({
              time: xAxisLabels[dayOfMonth - 1],
              value: amount,
              type: "Tiền ra",
            });
          }
        }

        // Count total transactions
        if (existingTotal) {
          existingTotal.count += 1;
        } else {
          totalTransactionData.push({
            time: xAxisLabels[dayOfMonth - 1],
            count: 1,
            type: "Tổng số giao dịch",
          });
        }
      });
    } else if (mode === "weekly") {
      // Group transactions by the day of the week
      transactions.forEach((transaction) => {
        if (transaction.status !== "success") return;

        const transactionDate = new Date(transaction.date);
        const dayOfWeek = transactionDate.getDay();

        // Find existing entries for incoming and outcoming categories
        const existingIncoming = groupedData.find(
          (data) =>
            data.time === xAxisLabels[dayOfWeek] && data.type === "incoming"
        );
        const existingOutcoming = groupedData.find(
          (data) =>
            data.time === xAxisLabels[dayOfWeek] &&
            (data.type === "outcoming" || data.type === "debt")
        );
        const existingTotal = totalTransactionData.find(
          (data) => data.time === xAxisLabels[dayOfWeek]
        );

        const amount =
          transaction.category === "outcoming" ||
          transaction.category === "debt"
            ? Math.abs(transaction.amount)
            : transaction.amount;

        // Update incoming or outcoming amounts
        if (transaction.category === "incoming") {
          if (existingIncoming) {
            existingIncoming.value += amount;
          } else {
            groupedData.push({
              time: xAxisLabels[dayOfWeek],
              value: amount,
              type: "Tiền vào",
            });
          }
        } else if (
          transaction.category === "outcoming" ||
          transaction.category === "debt"
        ) {
          if (existingOutcoming) {
            existingOutcoming.value += amount;
          } else {
            groupedData.push({
              time: xAxisLabels[dayOfWeek],
              value: amount,
              type: "Tiền ra",
            });
          }
        }

        // Count total transactions
        if (existingTotal) {
          existingTotal.count += 1;
        } else {
          totalTransactionData.push({
            time: xAxisLabels[dayOfWeek],
            count: 1,
            type: "Tổng số giao dịch",
          });
        }
      });
    }

    // Sort data by `time` in ascending order
    groupedData.sort(
      (a, b) => xAxisLabels.indexOf(a.time) - xAxisLabels.indexOf(b.time)
    );
    totalTransactionData.sort(
      (a, b) => xAxisLabels.indexOf(a.time) - xAxisLabels.indexOf(b.time)
    );

    return { groupedData, totalTransactionData };
  };

  const { groupedData, totalTransactionData } = processData();
  console.log("group", groupedData);

  const config = {
    xField: "time",
    legend: {
      color: {
        itemMarker: "round",
        itemMarkerSize: 14,
        position: "bottom",
        layout: { justifyContent: "center" },
      },
    },
    scale: {
      y: { nice: false },
      color: {
        range: ["#052bec", "#7effd4", "#00c9f5"],
      },
    },
    children: [
      {
        data: totalTransactionData,
        type: "area",
        shapeField: "smooth",
        yField: "count",
        colorField: "type",
        scale: { y: { domainMin: 0 } },
        style: {
          fill: "linear-gradient(-90deg, rgba(255,255,255,0.0) 0%, rgba(13, 56, 236, 0.7) 100%)",
          fillOpacity: 0.8,
        },
        axis: { y: false },
        tooltip: false,
      },
      {
        data: groupedData,
        type: "interval",
        yField: "value",
        colorField: "type",
        group: true,
        axis: {
          y: {
            position: "right",
            style: { titleFill: "#052bec" },
            labelFormatter: (d: number) =>
              d.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }),
          },
        },
        style: { maxWidth: 50, radiusTopLeft: 10, radiusTopRight: 10 },
        interaction: { elementHighlight: { background: true } },
        tooltip: {
          items: [
            {
              channel: "y",
              valueFormatter: (d: number) =>
                d.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }),
            },
          ],
        },
      },
      {
        data: totalTransactionData,
        type: "line",
        yField: "count",
        scale: { y: { domainMin: 0 } },
        axis: { y: false },
        colorField: "type",
        shapeField: "smooth",
        style: { lineWidth: 3 },
        interaction: {
          tooltip: {
            crosshairs: false,
            marker: false,
          },
        },
      },
      {
        data: totalTransactionData,
        type: "point",
        yField: "count",
        colorField: "type",
        shapeField: "point",
        sizeField: 5,
        style: {
          stroke: "#fff",
          fill: "#5e90f9",
        },
        axis: {
          y: {
            position: "left",
            title: "Tổng giao dịch",
            style: { titleFill: "#052bec" },
            tickMethod: (min: number, max: number) => {
              // Tạo mảng các giá trị nguyên giữa min và max
              const ticks = [];
              for (let i = Math.ceil(min); i <= Math.floor(max); i++) {
                ticks.push(i);
              }
              return ticks;
            },
          },
        },
        scale: { y: { domainMin: 0 } },
        tooltip: false,
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default MoneyFlowChart;
