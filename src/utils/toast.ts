import toast, { type ToastOptions } from 'react-hot-toast';
import React from 'react';

// Define custom icons as React elements or emoji strings
const icons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  unauthorized: '🔒',
  forbidden: '🚫',
  notFound: '❓',
  networkError: '🌐',
  serverError: '🔧'
};

// Toast utility functions with icons
export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      icon: icons.success,
      ...options
    });
  },

  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      icon: icons.error,
      ...options
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    toast(message, {
      icon: icons.warning,
      ...options
    });
  },

  info: (message: string, options?: ToastOptions) => {
    toast(message, {
      icon: icons.info,
      ...options
    });
  },

};

// Type for custom icons
type IconType = string | React.ReactElement;

// Alternative approach: Custom toast with JSX icons
export const showToastWithCustomIcon = {
  success: (message: string, customIcon?: IconType, options?: ToastOptions) => {
    toast.success(message, {
      icon: customIcon || icons.success,
      ...options
    });
  },

  error: (message: string, customIcon?: IconType, options?: ToastOptions) => {
    toast.error(message, {
      icon: customIcon || icons.error,
      ...options
    });
  }
};
