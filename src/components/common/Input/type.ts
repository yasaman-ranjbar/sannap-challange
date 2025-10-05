export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
  prefix?: string;
  isPhoneNumber?: boolean;
  phoneType?: "mobile" | "landline";
  inputDir?: "rtl" | "ltr";
  isValid?: boolean;
  isValidating?: boolean;
  showValidationIcon?: boolean;
}
