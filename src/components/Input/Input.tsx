import React from "react";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  className?: string;
  value: any;
  onChange?: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  placeholder?: string;
  max?: number;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  className = "",
  value,
  onChange,
  required = false,
  placeholder = "",
  max,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={name}
          placeholder={placeholder}
          maxLength={max}
          className="w-full rounded-md border border-input bg-background px-3 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors hover:bg-accent/20 focus:outline-2 focus:-outline-offset-2 focus:outline-mint-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default Input;
