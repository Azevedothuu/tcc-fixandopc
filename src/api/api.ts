const API_URL = ""; // luiz vai mandar

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw new Error(`Erro: ${res.status}`);
  return res.json();
}
