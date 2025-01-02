import api from "@utils/api";

const API_ENDPOINT = "api/customer/v1/contact";

export const createContact = async (
  bankId: string,
  beneficiaryId: string,
  nickname: string
) => {
  try {
    await api.post(API_ENDPOINT, {
      bankId: bankId,
      beneficiaryId: beneficiaryId,
      nickname: nickname,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
