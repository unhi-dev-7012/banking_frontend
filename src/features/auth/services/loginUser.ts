import api from "@utils/api";

const loginUser = async (username: string, password: string) => {
  const response = await api.post("/api/auth/v1/login", { username, password });
  return response.data.data;
};

export default loginUser;
