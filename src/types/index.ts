// Example User type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Province type
export interface Province {
  id: number;
  name: string;
}

// County type
export interface County {
  id: number;
  name: string;
}

// Insurance Branch type
export interface InsuranceBranch {
  id: number;
  name: string;
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
