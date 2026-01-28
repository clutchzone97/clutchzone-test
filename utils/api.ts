// utils/api.ts
import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';
const envBase = process.env.NEXT_PUBLIC_API_URL;
const apiBase = isDev ? "https://clutchzone-backend.onrender.com/api" : (envBase || "https://clutchzone-backend.onrender.com/api");

// Use absolute URL for SSR, relative for client if needed, but here we generally use the backend URL directly.
// For Next.js SSR, we might want to use the full URL always.

const api = axios.create({
  baseURL: apiBase,
  timeout: 20000, // Increased timeout for slower backends
});

api.interceptors.request.use((config) => {
  try {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem("cz_token");
        if (token) {
        if (!config.headers) config.headers = {} as any;
        (config.headers as any).Authorization = `Bearer ${token}`;
        }
    }
  } catch (err) {
    // ignore
  }
  return config;
}, (err) => Promise.reject(err));

api.interceptors.response.use((res) => res, (err) => {
  try {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      if (typeof window !== "undefined") {
          localStorage.removeItem("cz_token");
          // Redirect to login if needed, or handle via router
          if (!window.location.pathname.includes("/login")) {
             window.location.href = "/login";
          }
      }
    }
  } catch {
    // ignore
  }
  return Promise.reject(err);
});

export default api;
