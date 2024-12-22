import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, message } from "antd";
import { Spinner } from "@components/common/Spinner";
import { ROUTES_PATH } from "./constants/path";

const LoginScreen = lazy(() => import("@screens/authentication/LoginScreen"));

const AppLayout = lazy(() => import("@components/common/layout/AppLayout"));

// Config the query client (Cache, stale time, retry fetch,...)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60000 /* Data is consider stale after 1 minute */,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    // Config the query client provider
    <QueryClientProvider client={queryClient}>
      {/* Config the antd theme */}
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Inter, Arial, sans-serif",
          },
        }}
      >
        {contextHolder}
        {/* Config the application routers */}
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path={ROUTES_PATH.LOGIN}
                element={<LoginScreen messageApi={messageApi} />}
              />
              <Route path="/*" element={<AppLayout />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
