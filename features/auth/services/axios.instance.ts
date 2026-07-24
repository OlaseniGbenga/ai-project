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
  // (error) => {
  //   if (error.response?.status === 401 || error.response?.status === 403) {
  //     clearAuthSession();
  //   }

  //   const message =
  //     error.response?.data?.message?.message ||
  //     error.response?.data?.message ||
  //     "Something went wrong";
  //   return Promise.reject(new Error(message));
  // },
);

export default axiosInstance;
