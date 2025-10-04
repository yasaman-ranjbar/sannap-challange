import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { showToast } from "../utils/toast";

export type APIError = {
  message: string;
  is_success: boolean;
  error_details: {
    type: string;
    code: string;
    detail: string;
    attr: string;
    fa_details: string;
  };
  response?: null;
};

const createAPIClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor with error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      const errorData = error.response?.data;
      const errorDetails = errorData?.error_details;

      const apiError: APIError = {
        is_success: false,
        message: error.message || "خطای نامشخص",
        error_details: {
          type: errorDetails?.type || "unknown_error",
          code: errorDetails?.code || "unknown",
          detail: errorDetails?.detail || "",
          attr: errorDetails?.attr || "",
          fa_details: errorDetails?.fa_details || "",
        },
      };

      if (errorDetails?.fa_details) {
        showToast.error(errorDetails?.fa_details);
      }

      return Promise.reject(apiError);
    }
  );

  return client;
};

// Create and export API client instance
export const apiClient = createAPIClient(
  import.meta.env.VITE_API_BASE_URL || ""
);

// HTTP Methods
export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => apiClient.post<T>(url, data, config),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => apiClient.put<T>(url, data, config),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config),
};
