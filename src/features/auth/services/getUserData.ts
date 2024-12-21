import api from "@utils/api";

export interface UserData {
  fullName: string;
  email: string;
}

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const response = await api.get("/api/customer/v1/me");
    const data = response.data.data;

    return {
      fullName: data.fullName || "Unknown User",
      email: data.email || "unknown@example.com",
    };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};
