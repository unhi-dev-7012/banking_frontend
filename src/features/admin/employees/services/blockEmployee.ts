import api from "@utils/api";

const API_ENDPOINT = "api/admin/v1/users";

export const blockEmployee = async (id: string, isBlocked: boolean) => {
  try {
    const command = isBlocked ? "block" : "unblock";
    await api.patch(`${API_ENDPOINT}/${command}/${id}`);
  } catch (error) {
    console.error(error);
    throw Error("Unable to block this users");
  }
};
