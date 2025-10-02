import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { showToast } from "../utils/toast";

export type APIError = {
    status?: number;
    message: string;
    details?: string;
}

const createAPIClient = (baseURL: string): AxiosInstance => {
    const client = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    });

    // Request interceptor (simplified, no token handling)
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
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            const apiError: APIError = {
                status: error.response?.status,
                message: "An error occurred",
                details: error.message,
            };

            // Handle specific error codes with server messages first, then fallback to generic messages
            switch (error.response?.status) {
                case 400:
                    apiError.message = serverMessage || "دیتای ارسال شده معتبر نمیباشد";
                    showToast.error(apiError.message);
                    break;
                case 401:
                    apiError.message = serverMessage || "دسترسی غیرمجاز";
                    showToast.unauthorized();
                    break;
                case 403:
                    apiError.message = serverMessage || "کاربر غیرمجاز";
                    showToast.forbidden();
                    break;
                case 404:
                    apiError.message = serverMessage || "صفحه یا منبع مورد نظر یافت نشد";
                    showToast.notFound();
                    break;
                case 429:
                    apiError.message = serverMessage || "تعداد درخواست‌ها بیش از حد مجاز است";
                    showToast.error(apiError.message);
                    break;
                case 500:
                    apiError.message = serverMessage || "خطای سرور";
                    showToast.serverError();
                    break;
                default:
                    // Check if it's a network error (no response)
                    if (!error.response) {
                        apiError.message = "خطا در اتصال به سرور";
                        showToast.networkError();
                    } else {
                        apiError.message = serverMessage || "خطای نامشخص";
                        showToast.error(apiError.message);
                    }
            }

            return Promise.reject(apiError);
        }
    );

    return client;
};

// Create and export API client instance
export const apiClient = createAPIClient(import.meta.env.VITE_API_BASE_URL || '');

// HTTP Methods
export const api = {
    get: <T = unknown>(url: string, config?: AxiosRequestConfig) => 
        apiClient.get<T>(url, config),
    
    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
        apiClient.post<T>(url, data, config),
    
    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
        apiClient.put<T>(url, data, config),
    
    delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => 
        apiClient.delete<T>(url, config),
};