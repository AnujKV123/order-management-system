import React from "react";
import "../Styles/Input.css";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  register?: any;
  style?: React.CSSProperties;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  type = "text",
  placeholder = "",
  error,
  disabled = false,
  required = false,
  className = "",
  register = null,
  style,
  ...props
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? "input-error" : ""}`}
        required={required}
        style={style}
        {...props}
        {...(register && { ...register(name) })}
      />
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
};

export default Input;
