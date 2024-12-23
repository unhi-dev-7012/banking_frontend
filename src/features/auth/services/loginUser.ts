import api from "@utils/api";

const loginUser = async (
  username: string,
  password: string,
  captchaToken: string | null
) => {
  if (!captchaToken) {
    throw new Error("CAPTCHA token is required");
  }
  const response = await api.post("/api/auth/v1/login", {
    username,
    password,
    captchaToken,
  });
  return response.data;
};

export default loginUser;
