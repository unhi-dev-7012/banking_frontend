import React, { useEffect, useState } from "react";
import { DualAxes } from "@ant-design/plots";

const MoneyFlowChart: React.FC = () => {
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [totalTransactionData, setTotalTransactionData] = useState<any[]>([]);

  useEffect(() => {
    // Giả lập dữ liệu được lấy từ API hoặc từ một nguồn bên ngoài
    const fetchedTransactionData = [
      { time: "2019-03", value: 350, type: "income" },
      { time: "2019-04", value: 900, type: "income" },
      { time: "2019-05", value: 300, type: "income" },
      { time: "2019-06", value: 450, type: "income" },
      { time: "2019-07", value: 470, type: "income" },
      { time: "2019-03", value: 220, type: "outcome" },
      { time: "2019-04", value: 300, type: "outcome" },
      { time: "2019-05", value: 250, type: "outcome" },
      { time: "2019-06", value: 220, type: "outcome" },
      { time: "2019-07", value: 362, type: "outcome" },
    ];

    const fetchedTotalTransactionData = [
      { time: "2019-03", value: 87, name: "transactions" },
      { time: "2019-04", value: 100, name: "transactions" },
      { time: "2019-05", value: 200, name: "transactions" },
      { time: "2019-06", value: 50, name: "transactions" },
      { time: "2019-07", value: 10, name: "transactions" },
    ];

    // Set dữ liệu vào state
    setTransactionData(fetchedTransactionData);
    setTotalTransactionData(fetchedTotalTransactionData);
  }, []); // Chỉ chạy khi component được mount lần đầu tiên

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
        yField: "value",
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
        data: transactionData,
        type: "interval",
        yField: "value",
        colorField: "type",
        group: true,
        axis: { y: false },
        style: { maxWidth: 50, radiusTopLeft: 10, radiusTopRight: 10 },
        interaction: { elementHighlight: { background: true } },
      },
      {
        data: totalTransactionData,
        type: "line",
        yField: "value",
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
        yField: "value",
        colorField: "type",
        shapeField: "point",
        sizeField: 5,
        style: {
          stroke: "#fff",
          fill: "#5e90f9",
        },
        scale: { y: { domainMin: 0 } },
        tooltip: false,
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default MoneyFlowChart;
