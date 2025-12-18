import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error?.response?.data?.message ||
        error?.message ||
        "Terjadi kesalahan pada server"
    );
  }
);

export default apiClient;
