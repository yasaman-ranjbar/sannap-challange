// Core API service configuration
import { showToast } from "../utils/toast";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  showErrorToast?: boolean; // Option to disable error toast for specific requests
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, showErrorToast = true, ...fetchOptions } = options;

    // Build URL with query parameters
    let url = `${this.baseURL}${endpoint}`;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }


    // Default headers
    const headers = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    };

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        let errorMessage = `${response.status}`;
        
        // Try to get error message from response
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch {
          // If parsing JSON fails, use default message
          if (response.status === 400) {
            errorMessage = "درخواست نامعتبر است";
          } else if (response.status === 401) {
            errorMessage = "شما مجاز به دسترسی نیستید";
          } else if (response.status === 403) {
            errorMessage = "دسترسی ممنوع";
          } else if (response.status === 404) {
            errorMessage = "صفحه یا منبع مورد نظر یافت نشد";
          } else if (response.status === 500) {
            errorMessage = "خطای سرور داخلی";
          } else if (response.status >= 500) {
            errorMessage = "خطای سرور";
          }
        }

        if (showErrorToast) {
          // Use specific error methods for common status codes
          if (response.status === 400) {
            showToast.badRequest();
          } else if (response.status === 401) {
            showToast.unauthorized();
          } else if (response.status === 403) {
            showToast.forbidden();
          } else if (response.status === 404) {
            showToast.notFound();
          } else if (response.status === 500) {
            showToast.serverError();
          } else if (response.status >= 500) {
            showToast.serverError();
          } else {
            showToast.error(errorMessage);
          }
        }

        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      
      // If it's a network error or other non-HTTP error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        if (showErrorToast) {
          showToast.networkError();
        }
        throw new Error("خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.");
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>, showErrorToast = true): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", params, showErrorToast });
  }

  async post<T, K = unknown>(endpoint: string, data: K, showErrorToast = true): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      showErrorToast,
    });
  }

  async put<T, K = unknown>(endpoint: string, data: K, showErrorToast = true): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      showErrorToast,
    });
  }

  async delete<T>(endpoint: string, showErrorToast = true): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", showErrorToast });
  }
}

export const apiService = new ApiService(import.meta.env.API_BASE_URL as string);
