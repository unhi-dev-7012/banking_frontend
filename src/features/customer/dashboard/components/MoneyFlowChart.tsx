import React from "react";
import { DualAxes } from "@ant-design/plots";
import { MoneyFlowData } from "../stores/dashboardStore";
import useMoneyFlowData from "../hooks/useMoneyFlowData";

interface MoneyFlowChartProps {
  mode: string;
  data: MoneyFlowData | undefined;
}

const MoneyFlowChart: React.FC<MoneyFlowChartProps> = ({ mode, data }) => {
  if (!data) {
    return <div>Loading...</div>; // Or return null, or a placeholder
  }

  const { groupedData, totalTransactionData } = useMoneyFlowData(mode, data);

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
