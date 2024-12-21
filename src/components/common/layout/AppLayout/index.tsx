import React from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { AppSider } from '../AppSider';
import { AppHeader } from '../AppHeader';
import { AppRoutes } from '../AppRoutes';
import { useBreadcrumb } from '@hooks/useBreadcrumb';

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useBreadcrumb();

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: '#FAFAFA',
          },
        }
      }}
    >
      <Layout style={{ minHeight: '100vh', gap: 12 }}>
        <AppSider />

        <Layout
          style={{
            height: '100vh',
            padding: '16px 16px 16px 0',
          }}
        >
          <Layout.Content
            style={{
              backgroundColor: colorBgContainer,
              borderRadius: 16,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <AppHeader />

            <div
              style={{
                padding: 16,
                flex: 1,
                overflowY: 'scroll',
              }}
            >
              <AppRoutes />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

AppLayout.displayName = 'AppLayout';

export default AppLayout;
