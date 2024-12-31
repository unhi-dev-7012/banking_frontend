import api from "@utils/api";

const API_ENDPOINT = "api/customer/v1/contact";

export const updateContact = async (
  id: string,
  nickname: string,
  beneficiaryId: string
) => {
  try {
    await api.patch(`${API_ENDPOINT}/${id}`, {
      nickname: nickname,
      beneficiaryId: beneficiaryId,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
