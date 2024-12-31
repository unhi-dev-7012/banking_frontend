import React from "react";
import { Tag } from "antd";
import { DebtStatus } from "../debtType";

const DebtStatusUI: React.FC<{ status: string }> = ({ status }) => {
  let statusText = "";
  let color = "";

  switch (status) {
    case DebtStatus.INDEBTED:
      statusText = "Nợ";
      color = "blue";
      break;
    case DebtStatus.SETTLED:
      statusText = "Đã thanh toán";
      color = "green";
      break;
    case DebtStatus.CANCELED:
      statusText = "Đã hủy";
      color = "red";
      break;
    default:
      statusText = "Không xác định";
      color = "default";
  }

  return <Tag color={color}>{statusText}</Tag>;
};
export default DebtStatusUI;
