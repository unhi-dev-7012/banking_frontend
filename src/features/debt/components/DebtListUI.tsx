import React from "react";
import { Debt, DebtStatus } from "../debtType";
import { Button } from "antd";
import TableComponent from "@components/common/Table/TableComponent";
import DebtStatusUI from "./DebtStatusUI";

interface DebtListUIProps {
  debts: Debt[];
  activeTab: string;
}

const DebtListUI: React.FC<DebtListUIProps> = ({ debts, activeTab }) => {
  const columns = [
    {
      title:
        activeTab === "created" ? "Tài khoản người nợ" : "Tài khoản nhắc nợ", // Change column title based on tab
      dataIndex: activeTab === "created" ? "debtorId" : "reminderId", // Adjust the field based on tab
      key: activeTab === "created" ? "debtorId" : "reminderId",
    },
    { title: "Số tiền", dataIndex: "amount", key: "amount" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: Debt) => <DebtStatusUI status={record.status} />,
    },
    { title: "Nội dung", dataIndex: "message", key: "message" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Debt) => (
        <div>
          {record.status === DebtStatus.INDEBTED && (
            <>
              <Button key={`cancel-${record.debtorId}`}>Hủy</Button>
              <Button key={`pay-${record.debtorId}`}>Thanh toán</Button>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <TableComponent
      columns={columns}
      datasource={debts}
      rowKey="id"
      pagination={{ current: 1, pageSize: 5, total: debts.length }}
      loading={false}
      handleTableChange={() => {}}
    />
  );
};

export default DebtListUI;
