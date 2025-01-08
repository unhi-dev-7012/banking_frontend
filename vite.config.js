import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@assets": resolve(__dirname, "./src/assets"),
            "@components": resolve(__dirname, "./src/components"),
            "@constants": resolve(__dirname, "./src/constants"),
            "@fonts": resolve(__dirname, "./src/fonts"),
            "@hooks": resolve(__dirname, "./src/hooks"),
            "@screens": resolve(__dirname, "./src/screens"),
            "@services": resolve(__dirname, "./src/services"),
            "@stores": resolve(__dirname, "./src/stores"),
            "@utils": resolve(__dirname, "./src/utils"),
            "@features": resolve(__dirname, "./src/features"),
            "@routes": resolve(__dirname, "./src/routes"),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
        proxy: {
            "/api": {
                target: process.env.VITE_API_URL,
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
