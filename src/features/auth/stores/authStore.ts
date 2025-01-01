import { create } from "zustand";
import { EROLE } from "../../../constants/authorization";
import { requestForToken } from "../../../config/firebase";
import { createFcm } from "../services/createFcm";
import { deleteFcm } from "../services/deleteFcm";

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
  role: string | null;
  isAuthenticated: boolean;
  handleLogin: (
    accessToken: string,
    refreshToken: string,
    role: string
  ) => void;
  handleLogout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  handleLogin: async (accessToken, refreshToken, role) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);

    if (role === EROLE.CUSTOMER) {
      const permission = await Notification.requestPermission();
      if (permission === "granted" || !localStorage.getItem("fcm_token")) {
        const token = await requestForToken();

        if (token) {
          await createFcm(token);
          localStorage.setItem("fcm_token", token);
        }
      }
    }
    set({
      accessToken,
      refreshToken,
      role,
      isAuthenticated: true,
    });
  },
  handleLogout: async () => {
    const fcmToken = localStorage.getItem("fcm_token");
    if (get().role === EROLE.CUSTOMER && fcmToken) {
      await deleteFcm(fcmToken);
      localStorage.removeItem("fcm_token");
    }

    console.log("handle logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    set({
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
    });
  },
}));
