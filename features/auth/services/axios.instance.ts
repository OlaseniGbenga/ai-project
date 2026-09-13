import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://segsalerty-ai-powered-project-backend.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const markActivity = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:activity"));
  }
};

const clearAuthSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("auth:logout"));

  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  markActivity();
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    markActivity();
    return response;
  },
  (error) => {
    const data = error.response?.data;
    const status = error.response?.status;

    if (status === 401) {
      clearAuthSession();
    }

    const message =
      data?.message?.message ||
      (typeof data?.message === "string" ? data.message : null) ||
      "Something went wrong";

    const enrichedError = new Error(message) as Error & { status?: number; emailVerified?: boolean };
    enrichedError.status = status;
    enrichedError.emailVerified = data?.message?.emailVerified;

    return Promise.reject(enrichedError);
  },
);

export default axiosInstance;
