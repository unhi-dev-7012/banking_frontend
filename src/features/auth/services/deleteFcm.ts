import api from "../../../utils/api";

export const deleteFcm = async (token: string) => {
  const url = `api/v1/fcm/${token}`;

  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("Failed to delete fcm data:", error);
    return null;
  }
};
