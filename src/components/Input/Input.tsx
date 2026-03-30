import { ChangeEvent, FocusEvent, useId } from "react";

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  showError?: boolean;
  required?: boolean;
  label?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  showError = false,
  required = false,
  label,
  onFocus,
  onBlur,
}: InputProps) {
  const generatedId = useId();
  const inputId = label
    ? `input-${label.toLowerCase().replace(/\s+/g, "-")}`
    : `input-${generatedId.replace(/:/g, "")}`;

  const displayError = showError && !!error;
  const errorId = displayError ? `${inputId}-error` : undefined;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required"> *</span>}
        </label>
      )}

      <input
        id={inputId}
        className={`input ${displayError ? "input-error" : ""}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-invalid={displayError}
        aria-describedby={errorId}
      />

      {displayError && (
        <span id={errorId} className="input-error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}