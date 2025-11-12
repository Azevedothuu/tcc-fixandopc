import axios from "axios";

// cria conexão com o backend
export const api = axios.create({
  baseURL: "https://fixando-backend.vercel.app/api", // luiz vc precisa mandar
  withCredentials: true,
});

// ====================
//  AUTENTICAÇÃO
// ====================

// Login
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  localStorage.setItem("token", response.data.token);
  api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  return response.data;
};

// Registrar
export const registerUser = async (userData: any) => {
  const response = await api.post("/registrar", userData);
  return response.data;
};

// ====================
//  POSTS
// ====================

// Criar post
export const createPost = async (content: string, image?: File) => {
  const formData = new FormData();
  formData.append("content", content);
  if (image) formData.append("image", image);

  const response = await api.post("/post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// Buscar feed (todos os posts)
export const getFeed = async () => {
  const response = await api.get("/feed");
  return response.data;
};

// Curtir post
export const likePost = async (postId: string) => {
  const response = await api.get(`/likes?post=${postId}`);
  return response.data;
};

// ====================
//  COMENTÁRIOS
// ====================

// Criar comentário
export const createComment = async (postId: string, text: string) => {
  const response = await api.post("/criar-comentario", { postId, text });
  return response.data;
};
