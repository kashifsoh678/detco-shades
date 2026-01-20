import axios from "axios";
import { API_CONFIG } from "@/constants/api";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Auth is handled via HTTP-only cookies, so we don't need to manually attach tokens here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Something went wrong";

      if (status === 401) {
        // Unauthorized: Redirect to login handled by Middleware/AuthContext,
        // but we can show a toast if it happens unexpectedly
        // Avoid showing toast on initial 'me' check failure (which is expected)
        if (!error.config.url.includes("/auth/me")) {
          toast.error("Session expired. Please login again.");
          if (typeof window !== "undefined") {
            window.location.href = "/admin";
          }
        }
      } else if (status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        // For 400 errors, we let the component handle specific validation errors,
        // but if not caught, we can show a generic message or just re-throw
        // Actually, let's allow components to handle 4xx unless it's a critical failure
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
