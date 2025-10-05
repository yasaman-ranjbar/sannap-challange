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
        if (errorDetails.code === "agent_code_unique") {
          showToast.warning(`کد نمایندگی قبلاً ثبت شده است`);
        } else {
          showToast.error(errorDetails?.fa_details);
        }
      }

      return Promise.reject(apiError);
    }
  );

  return client;
};

// Create and export API client instances
export const apiClient = createAPIClient(
  import.meta.env.VITE_API_BASE_URL || ""
);

// Create second API client for base endpoints
export const baseApiClient = createAPIClient(
  import.meta.env.VITE_BASE_API_URL_BASE || ""
);

export const insuranceApiClient = createAPIClient(
  import.meta.env.VITE_INSURANCE_API_BASE_URL || ""
);

// HTTP Methods for main API
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

// HTTP Methods for base API (provinces, cities, etc.)
export const baseApi = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    baseApiClient.get<T>(url, config),
};

export const insuranceApi = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    insuranceApiClient.get<T>(url, config),
};
