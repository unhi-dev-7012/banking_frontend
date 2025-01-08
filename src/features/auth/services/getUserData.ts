import api from "@utils/api";
import { useAuthStore } from "../stores/authStore";

export interface UserData {
  id?: string;
  fullName?: string;
  email?: string;
  username?: string;
  createdAt?: Date | undefined;
  bankAccount?: string;
  balance?: number;
}

export const getUserData = async (): Promise<UserData | undefined> => {
  const { role, setUser } = useAuthStore.getState();

  if (!role) {
    return undefined;
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
      return undefined;
  }

  try {
    const response = await api.get(url);
    const data = response.data;
    const user = {
      id: data.id,
      fullName: data.fullName || "Unknown User",
      email: data.email || "unknown@example.com",
      bankAccount: data?.bankAccount?.id || "",
      balance: data?.bankAccount?.balance || 0,
      username: data.username || "unknown",
      createdAt: data.createdAt || undefined,
    };
    setUser(user);
    return user;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return undefined;
  }
};
