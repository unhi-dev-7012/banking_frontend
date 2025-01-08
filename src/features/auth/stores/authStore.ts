import { create } from "zustand";
import { EROLE } from "../../../constants/authorization";
import { requestForToken } from "../../../config/firebase";
import { createFcm } from "../services/createFcm";
import { deleteFcm } from "../services/deleteFcm";
import { io } from "socket.io-client";
import { getUserData, UserData } from "../services/getUserData";

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
  role: string | null;
  isAuthenticated: boolean;
  socket: any;
  userData: UserData;
  handleLogin: (
    accessToken: string,
    refreshToken: string,
    role: string
  ) => void;
  handleLogout: () => void;
  setSocket: (socket: any) => void;
  setUser: (user: UserData) => void;
}

const emptyUser = {
  id: "",
  fullName: "",
  email: "",
  username: "",
  createdAt: new Date(),
  bankAccount: "",
  balance: 0,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  socket: io(import.meta.env.VITE_API_URL),
  userData: emptyUser,
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

    const user = await getUserData();
    // localStorage.setItem("user_id", user?.id as string);
    set({
      userData: user,
    });
  },
  handleLogout: async () => {
    const fcmToken = localStorage.getItem("fcm_token");
    const currentRole = get().role;

    set({
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      socket: null,
    });

    if (currentRole === EROLE.CUSTOMER && fcmToken) {
      await deleteFcm(fcmToken);
      localStorage.removeItem("fcm_token");
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
  },
  setSocket: (socket: any) => {
    set({ socket: socket });
  },
  setUser: (user: UserData) => {
    set({ userData: user });
  },
}));
