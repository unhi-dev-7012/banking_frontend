import api from "@utils/api";

const API_ENDPOINT = "/api/admin/v1/users";

export const listEmployees = async (
  current: number = 1,
  pageSize: number = 10
) => {
  try {
    const response = await api.get(API_ENDPOINT, {
      params: {
        page: current,
        limit: pageSize,
        role: "employee",
      },
    });
    response.data = response.data.map((datum: any) => {
      const { createdAt, ...rest } = datum; // Destructure createdAt from the object
      return {
        ...rest, // Include the remaining properties
        createdAt: new Date(createdAt).toLocaleDateString(), // Format createdAt
      };
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
