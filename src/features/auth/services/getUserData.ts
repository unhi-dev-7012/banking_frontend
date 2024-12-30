import api from "@utils/api";
import { useAuthStore } from "../stores/authStore";

export interface UserData {
  fullName?: string;
  email?: string;
  username?: string;
  createdAt?: Date | undefined;
  bankAccount?: string;
  balance?: number;
}

export const getUserData = async (): Promise<UserData | null> => {
  const { role } = useAuthStore.getState();

  if (!role) {
    return null;
  }

  let url = "";

  switch (role) {
    case "admin":
      url = "/api/admin/v1/users/me";
      break;
    case "employee":
      url = "/api/employee/v1/users/me";
      break;
    case "customer":
      url = "/api/customer/v1/me";
      break;
    default:
      return null;
  }

  try {
    const response = await api.get(url);
    const data = response.data;
    return {
      fullName: data.fullName || "Unknown User",
      email: data.email || "unknown@example.com",
      username: data.username || "unknown",
      createdAt: data.createdAt || undefined,
      // bankAccount: data.bankAccount.id || "",
      // // balance: data.bankAccount.balance || "",
    };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};
