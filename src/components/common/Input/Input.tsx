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
      inputDir,
      ...rest
    },
    ref
  ) => {
    const hasError = touched && error;

    // Format Iranian phone number as user types
    const formatPhoneNumber = (input: string): string => {
      // Remove all non-digit characters
      const digits = input.replace(/\D/g, "");

      // Format: XXXX XXX XXXX (Iranian format: 0912 438 8097)
      if (digits.length <= 4) {
        return digits;
      } else if (digits.length <= 7) {
        return `${digits.slice(0, 4)} ${digits.slice(4)}`;
      } else {
        return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(
          7,
          11
        )}`;
      }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isPhoneNumber) {
        const input = e.target.value;
        const digits = input.replace(/\D/g, "");

        // Limit to 11 digits for Iranian phone number
        if (digits.length <= 11) {
          const formatted = formatPhoneNumber(digits);
          e.target.value = formatted;
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
        <div className="relative">
          {/* Country Code Prefix */}
          {prefix && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <div className="w-px h-6 bg-[#D2D1D1]"></div>
              <span className="text-[#D2D1D1] text-sm">{prefix}</span>
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
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
