import axios from "axios";

export const api = axios.create({
  baseURL: "https://fixando-backend.vercel.app/api" // <- base /api
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ====================
//  AUTENTICAÇÃO
// ====================

// Login
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data.token);
  api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
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
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não está logado");

  const formData = new FormData();
  formData.append("content", content);
  if (image) formData.append("image", image);

  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`, // <- aqui envia o token
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
