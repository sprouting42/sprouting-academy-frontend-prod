import ky, { isHTTPError } from "ky";

const API_BASE_URL = process.env.API_URL || "http://localhost:3000";

const api = ky.create({
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          console.error("API Error:", errorBody);
        }
      },
    ],
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
  },
  prefixUrl: API_BASE_URL,
});

export const apiFetch = {
  delete: async <T>(path: string, body?: unknown): Promise<T> => {
    try {
      return await api.delete(path, { json: body }).json();
    } catch (error) {
      if (isHTTPError(error))
        console.error("DELETE HTTP error:", error.response.status);
      throw error;
    }
  },

  get: async <T>(
    path: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<T> => {
    try {
      return await api.get(path, { searchParams: params }).json();
    } catch (error) {
      if (isHTTPError(error))
        console.error("GET HTTP error:", error.response.status);
      throw error;
    }
  },

  post: async <T>(path: string, body?: unknown): Promise<T> => {
    try {
      return await api.post(path, { json: body }).json();
    } catch (error) {
      if (isHTTPError(error))
        console.error("POST HTTP error:", error.response.status);
      throw error;
    }
  },

  put: async <T>(path: string, body?: unknown): Promise<T> => {
    try {
      return await api.put(path, { json: body }).json();
    } catch (error) {
      if (isHTTPError(error))
        console.error("PUT HTTP error:", error.response.status);
      throw error;
    }
  },
};
