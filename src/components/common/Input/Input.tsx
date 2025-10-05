import React, { forwardRef } from "react";
import type { InputProps } from "./type";

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
      className = "",
      dir = "rtl",
      prefix,
      isPhoneNumber = false,
      phoneType = "landline",
      inputDir,
      isValid = false,
      isValidating = false,
      showValidationIcon = false,
      ...rest
    },
    ref
  ) => {
    const hasError = touched && error;

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isPhoneNumber) {
        const input = e.target.value;
        const digits = input.replace(/\D/g, "");

        // Limit based on phone type: 11 digits for mobile, 8 digits for landline
        const maxDigits = phoneType === "mobile" ? 11 : 8;
        if (digits.length <= maxDigits) {
          e.target.value = digits;
          onChange?.(e);
        }
      } else {
        onChange?.(e);
      }
    };

    return (
      <div className={`w-full ${className}`} dir={dir}>
        {/* Label */}
        {label && (
          <label
            htmlFor={name}
            className={`block text-xs font-normal text-gray-800 mb-2.5 ${
              dir === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {label}
          </label>
        )}

        {/* Input Field */}
        <div className="relative h-12">
          {/* Country Code Prefix */}
          {prefix && (
            <div className="absolute left-4 top-0 bottom-0 flex items-center gap-2 pointer-events-none z-10">
              <div className="w-px h-6 bg-[#D2D1D1]"></div>
              <span className="text-[#D2D1D1] text-sm">{prefix}</span>
            </div>
          )}

          {/* Validation Icons */}
          {showValidationIcon && (
            <div className="absolute left-4 top-0 bottom-0 flex items-center z-10">
              {isValidating ? (
                <svg
                  className="animate-spin h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : isValid ? (
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ) : null}
            </div>
          )}

          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handlePhoneChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            inputMode={isPhoneNumber ? "numeric" : undefined}
            dir={inputDir || dir}
            className={`
              w-full h-12 py-3.5 bg-white rounded-lg border-2 transition-all duration-200
              focus:outline-none focus:border-[#017785] focus:ring-0
              placeholder:text-[#D2D1D1] text-sm
              ${
                prefix
                  ? inputDir === "ltr" || (!inputDir && dir === "ltr")
                    ? "pl-14 pr-4"
                    : "pr-4 pl-20"
                  : "px-4"
              }
              ${
                inputDir === "ltr" || (!inputDir && dir === "ltr")
                  ? "text-left"
                  : "text-right"
              }
              ${
                hasError
                  ? "border-red-400 bg-red-50/30"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
            {...rest}
          />

          {/* Error Message */}
          {hasError && (
            <p
              className={`mt-2 text-xs text-red-500 ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
