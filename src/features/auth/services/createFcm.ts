import api from "../../../utils/api";

export const createFcm = async (token: string) => {
  const url = "api/v1/fcm";

  try {
    const response = await api.post(url, { token: token });
    return response.data;
  } catch (error) {
    console.error("Failed to save fcm data:", error);
    return null;
  }
};
