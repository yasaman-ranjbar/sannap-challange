import { forwardRef } from "react";
import type { ButtonProps } from "./type";
import { LoadingSpinner } from "../LoadingSpinner";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      className = "",
      icon,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Base styles
    const baseStyles = `
      inline-flex items-center justify-center font-medium rounded-lg
      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
      ${fullWidth ? "w-full" : ""}
      ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
    `;

    // Size styles
    const sizeStyles = {
      sm: "px-4 text-sm h-9",
      md: "px-6 text-lg h-12",
      lg: "px-8 text-base h-14",
    };

    // Variant styles
    const variantStyles = {
      primary: isDisabled
        ? "bg-[#BFD5D8] text-white"
        : "bg-[#017785] text-white hover:bg-[#015960] focus:ring-[#017785]",
      secondary: isDisabled
        ? "bg-gray-100 text-gray-400 border border-gray-200"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-200",
      outline: isDisabled
        ? "border-2 border-gray-200 text-gray-400 bg-white"
        : "border-2 border-[#017785] text-[#017785] bg-white hover:bg-[#017785] hover:text-white focus:ring-[#017785]",
      text: isDisabled
        ? "text-gray-400"
        : "text-[#017785] hover:text-[#015960] focus:ring-[#017785]",
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          ${baseStyles}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${className}
        `}
        {...rest}
      >
        {loading && <LoadingSpinner size="sm" className="mr-2" />}
        {children}
        {icon && <img src={icon} alt="icon" className="mr-2" />}
      </button>
    );
  }
);

Button.displayName = "Button";
