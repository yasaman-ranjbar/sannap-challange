import React from "react";
import type { RadioProps } from "./type";

const Radio: React.FC<RadioProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  touched,
  className = "",
  dir = "rtl",
  disabled = false,
}) => {
  const hasError = touched && error;

  const handleChange = (optionValue: string) => {
    if (!disabled && onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-between ${className}`}
      dir={dir}
    >
      {/* Label */}
      {label && (
        <label className="block text-sm font-normal text-gray-800">
          {label}
        </label>
      )}

      {/* Radio Options */}
      <div className="flex gap-6 flex-row-reverse">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={`flex items-center gap-2 cursor-pointer ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {/* Custom Radio Button */}
              <div
                className="relative flex items-center justify-center"
                onClick={() => handleChange(option.value)}
              >
                {/* Outer Circle */}
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 transition-all duration-200
                    flex items-center justify-center
                    ${
                      isSelected
                        ? "border-[#F86534]"
                        : "border-gray-300 hover:border-gray-400"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-3.5 h-3.5 bg-[#F86534] rounded-full" />
                  )}
                </div>

                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleChange(option.value)}
                  disabled={disabled}
                  className="sr-only"
                  aria-label={option.label}
                />
              </div>

              {/* Label Text */}
              <span
                className={`text-sm select-none ${
                  isSelected ? "text-gray-900 font-medium" : "text-gray-700"
                }`}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;
