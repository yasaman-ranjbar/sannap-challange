export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioProps {
  label?: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  touched?: boolean;
  className?: string;
  dir?: "rtl" | "ltr";
  disabled?: boolean;
}
