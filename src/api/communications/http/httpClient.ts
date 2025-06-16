import { SERVER_URL } from "../../../constants/serverURL";

const baseUrl = SERVER_URL;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erreur serveur');
  }
  return response.json();
};

const getHeaders = (): HeadersInit => {
  // Ajoute ici un token si nécessaire
  return {
    'Content-Type': 'application/json',
  };
};

export const http = {
  get: async <T>(url: string): Promise<T> =>
    handleResponse<T>(await fetch(baseUrl + url, { method: 'GET', headers: getHeaders() })),

  post: async <T>(url: string, data: unknown): Promise<T> =>
    handleResponse<T>(
      await fetch(baseUrl + url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      })
    ),

  put: async <T>(url: string, data: unknown): Promise<T> =>
    handleResponse<T>(
      await fetch(baseUrl + url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      })
    ),

  delete: async <T>(url: string): Promise<T> =>
    handleResponse<T>(await fetch(baseUrl + url, { method: 'DELETE', headers: getHeaders() })),
};
