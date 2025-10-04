// Application constants

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  // Add more routes as needed
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  INVALID_EMAIL: "Please enter a valid email address.",
  REQUIRED_FIELD: "This field is required.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
};
