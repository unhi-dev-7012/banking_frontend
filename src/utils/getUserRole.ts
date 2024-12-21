// utils/getUserRole.ts

import { useAuthStore } from "src/features/auth/stores/authStore";

export const getUserRole = () => {
  const { role } = useAuthStore(); // Lấy role từ zustand store
  return role; // Trả về role người dùng
};
