import React from "react";
import { Breadcrumb, Button, ConfigProvider, Flex, Layout, theme } from "antd";
import { ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import "./index.css";
import { useAppStore } from "@stores/app";

export const AppHeader: React.FC = () => {
  const {
    token: { colorBorder, colorPrimaryText, colorPrimaryTextHover },
  } = theme.useToken();
  const { breadcrumbs, toggleSider, isSiderCollapsed } = useAppStore();

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            itemColor: colorPrimaryTextHover,
            lastItemColor: colorPrimaryText,
            separatorColor: colorPrimaryTextHover,
          },
        },
      }}
    >
      <Layout.Header
        style={{
          height: 56,
          backgroundColor: "transparent",
          borderBottom: "1px solid",
          borderColor: colorBorder,
          padding: "0px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Content */}
        <Flex align="center" gap={14}>
          <Button type="text" style={{ padding: 0 }} onClick={toggleSider}>
            {isSiderCollapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </Button>

          <div
            style={{
              height: 20,
              width: 1.5,
              backgroundColor: colorBorder,
            }}
          />

          <Breadcrumb
            className="headerBreadcrumb"
            separator={<ChevronRight size={20} />}
            items={breadcrumbs.map((item) => ({ title: item.title }))}
          />
        </Flex>
      </Layout.Header>
    </ConfigProvider>
  );
};
