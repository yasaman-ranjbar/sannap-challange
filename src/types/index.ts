

// Example User type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Example API Response type
export interface ApiResponse<T> {
  error_details: null;
  is_success: boolean;
  data: T;
  message?: string;
  response: string;
  status_code: number;
}

// Example Form Data type
export interface FormData {
  [key: string]: unknown;
}
