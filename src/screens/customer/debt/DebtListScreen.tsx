import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useDebtStore } from "@features/debt/stores/debtStore";
import { DebtCategory } from "@features/debt/debtType";
import DebtTable from "@features/debt/components/DebtTable";

interface IDebtListScreenProps {}

const DebtListScreen: React.FC<IDebtListScreenProps> = () => {
  const { data, loading, fetchTableData, setCategory } = useDebtStore();
  const [activeTab, setActiveTab] = useState("created");

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCategory(
      tab === "created"
        ? DebtCategory.CREATED_BY_ME
        : DebtCategory.CREATED_FOR_ME
    );
    fetchTableData(); // Fetch lại dữ liệu khi đổi tab
  };

  return (
    <div>
      <Typography.Title level={2}>DebtListScreen</Typography.Title>
      <DebtTable
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        debts={data} // Dữ liệu này đã được phân loại ở phía store
        loading={loading}
      />
    </div>
  );
};

DebtListScreen.displayName = "DebtListScreen";

export default DebtListScreen;
