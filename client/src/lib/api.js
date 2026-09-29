import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const clearSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const redirectToLogin = () => {
  clearSession();
  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url ?? "";
    const isLoginOrRegistration =
      url.endsWith("/auth/login") || url.endsWith("/auth/register");

    if (error.response?.status === 401 && !isLoginOrRegistration) {
      redirectToLogin();
      if (error.response.data && typeof error.response.data === "object") {
        error.response.data.message =
          "Your session has expired. Please sign in again.";
      }
    }

    return Promise.reject(error);
  },
);

export default api;