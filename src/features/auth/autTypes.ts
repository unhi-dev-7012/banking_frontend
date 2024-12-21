export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
}
export interface SignInFormValues {
  username: string;
  password: string;
}
