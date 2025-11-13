import axios from "axios";

// Cria instância do axios
export const api = axios.create({
  baseURL: "https://fixando-backend.vercel.app/api", // base da API
  withCredentials: true, // importante para enviar cookies se houver
});

// Interceptor para enviar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // pega token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // adiciona no header
  }
  return config;
});

// ====================
//  AUTENTICAÇÃO
// ====================

// Login
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data.token); // salva token
  return response.data;
};

// Registrar
export const registerUser = async (userData: any) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// ====================
//  POSTS
// ====================

export const createPost = async (content: string, image?: File) => {
  const formData = new FormData();
  formData.append("content", content);
  if (image) formData.append("image", image);

  // Token já será enviado pelo interceptor
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getFeed = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const likePost = async (postId: string) => {
  const response = await api.post(`/likes/${postId}`);
  return response.data;
};

// ====================
//  COMENTÁRIOS
// ====================

export const createComment = async (postId: string, text: string) => {
  const response = await api.post(`/comments/${postId}`, { text });
  return response.data;
};