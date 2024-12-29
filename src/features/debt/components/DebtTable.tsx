import TabComponent from "@components/common/Tab/TabComponent";
import { Debt, DebtTabItem } from "../debtType";
import { Spinner } from "@components/common/Spinner";
import DebtListUI from "./DebtListUI";

interface DebtTableUIProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  debts: Debt[];
  loading: boolean;
}

const DebtTable: React.FC<DebtTableUIProps> = ({
  activeTab,
  setActiveTab,
  debts,
  loading,
}) => {
  const defaultActiveTab = DebtTabItem.find((item) => item.key === activeTab);

  return (
    <>
      <TabComponent
        items={DebtTabItem}
        onTabChange={setActiveTab}
        defaultActiveKey={defaultActiveTab || DebtTabItem[0]}
      />
      {loading ? (
        <Spinner size="small" />
      ) : (
        <DebtListUI debts={debts} activeTab={activeTab} />
      )}
    </>
  );
};

export default DebtTable;
