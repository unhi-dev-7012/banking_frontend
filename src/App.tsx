import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, message } from "antd";
import { Spinner } from "@components/common/Spinner";
import { ROUTES_PATH } from "./constants/path";
import { requestForToken } from "./config/firebase";

const LoginScreen = lazy(
  () => import("@screens/authentication/login/LoginScreen")
);

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
  useEffect(() => {
    const getToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await requestForToken();
        if (token) {
          localStorage.setItem("fcm_token", token);
        }
      }
    };

    getToken();
  }, []);

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
