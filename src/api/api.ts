import axios from "axios";

const api = axios.create({
  baseURL: "https://fixando-backend.vercel.app/api",
  withCredentials: true, // mantém cookies/session se o backend usar
});

// função de registro
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// função de login (pra já deixar pronta)
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
