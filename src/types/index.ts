// Define your TypeScript types and interfaces here

// Example User type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Example API Response type
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Example Form Data type
export interface FormData {
  [key: string]: any;
}
