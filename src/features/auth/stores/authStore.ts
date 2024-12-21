import { create } from "zustand";

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

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  handleLogin: (accessToken, refreshToken, role) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);
    set({
      accessToken,
      refreshToken,
      role,
      isAuthenticated: true,
    });
  },
  handleLogout: () => {
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
