import { Tabs } from "antd";

interface TabItem {
  label: string;
  key: string;
}

interface TabProps {
  items: TabItem[];
  onTabChange: (key: string) => void;
  defaultActiveKey: TabItem;
}

const TabComponent: React.FC<TabProps> = ({
  items,
  onTabChange,
  defaultActiveKey,
}) => {
  return (
    <Tabs
      defaultActiveKey={defaultActiveKey.key}
      onChange={onTabChange}
      items={items.map((tab) => ({ key: tab.key, label: tab.label }))}
    />
  );
};

export default TabComponent;
