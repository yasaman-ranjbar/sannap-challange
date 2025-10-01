import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
  className?: string;
  dir?: "rtl" | "ltr";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      value = "",
      onChange,
      onBlur,
      error,
      touched,
      placeholder,
      type = "text",
      maxLength,
      showCharacterCount = false,
      className = "",
      dir = "rtl",
      ...rest
    },
    ref
  ) => {
    const hasError = touched && error;
    const currentLength = value?.length || 0;

    return (
      <div className={`mb-6 ${className}`} dir={dir}>
        {/* Label */}
        {label && (
          <label
            htmlFor={name}
            className={`block text-sm font-normal text-gray-800 mb-2.5 ${
              dir === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {label}
          </label>
        )}

        {/* Input Field */}
        <div className="relative">
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`
              w-full h-12 px-4 py-3.5 bg-red-500 rounded-2xl border-2 transition-all duration-200
              focus:outline-none focus:border-primary focus:ring-0
              placeholder:text-gray-300 text-base
              ${dir === "rtl" ? "text-right" : "text-left"}
              ${
                hasError
                  ? "border-red-400 bg-red-50/30"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
            {...rest}
          />

          {/* Character Counter */}
          {showCharacterCount && maxLength && (
            <div
              className={`mt-3 ${
                dir === "rtl" ? "text-center" : "text-center"
              }`}
            >
              <span
                className={`inline-block px-4 py-1.5 rounded-md text-sm font-medium ${
                  currentLength > maxLength
                    ? "bg-red-500 text-white"
                    : "bg-purple-600 text-white"
                }`}
              >
                {maxLength} ≥ {currentLength}
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <p
            className={`mt-2 text-sm text-red-600 ${
              dir === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
