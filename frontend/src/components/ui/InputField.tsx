import React, { ChangeEvent } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { RegisterFormValues } from "../../types/auth.types";

interface InputFieldProps {
  id: keyof RegisterFormValues;
  label: string;
  type: "email" | "password";
  value: string;
  placeholder: string;
  error?: string;
  icon: React.ReactNode;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (id: keyof RegisterFormValues) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  placeholder,
  error,
  icon,
  showToggle = false,
  isVisible = false,
  onToggleVisibility,
  onChange,
  onBlur,
}) => {
  const resolvedType = showToggle ? (isVisible ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>

        <input
          id={id}
          name={id}
          type={resolvedType}
          value={value}
          placeholder={placeholder}
          autoComplete={id === "email" ? "email" : "new-password"}
          onChange={onChange}
          onBlur={() => onBlur(id)}
          className={[
            "w-full rounded-lg border bg-white pl-9 py-2.5 text-sm text-gray-900",
            "placeholder:text-gray-400 outline-none transition-colors",
            showToggle ? "pr-10" : "pr-3",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          ].join(" ")}
        />

        {showToggle && (
          <button
            type="button"
            onClick={onToggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;