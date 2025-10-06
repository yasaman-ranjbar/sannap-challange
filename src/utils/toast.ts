import toast, { type ToastOptions } from "react-hot-toast";
import React from "react";
import { toastConfig } from "../constant/toastConfig";
import WarningIcon from "../assets/icon/WarningIcon";

const icons = {
  success: "✅",
  error: React.createElement(WarningIcon, {
    backgroundColor: toastConfig.error.iconTheme.primary,
    iconColor: toastConfig.error.iconTheme.secondary,
  }),
  warning: React.createElement(WarningIcon, {
    backgroundColor: toastConfig.warning.iconTheme.primary,
    iconColor: toastConfig.warning.iconTheme.secondary,
  }),
};

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      icon: icons.success,
      style: toastConfig.success.style,
      iconTheme: toastConfig.success.iconTheme,
      ...options,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      icon: icons.error,
      style: toastConfig.error.style,
      iconTheme: toastConfig.error.iconTheme,
      ...options,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    toast(message, {
      icon: icons.warning,
      style: toastConfig.warning.style,
      iconTheme: toastConfig.warning.iconTheme,
      ...options,
    });
  },
};

