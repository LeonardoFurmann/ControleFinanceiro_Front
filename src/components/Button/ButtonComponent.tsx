import React from "react";

type ButtonButtonComponentProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: any;
};

const ButtonComponent: React.FC<ButtonButtonComponentProps> = ({
  text,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex w-full justify-center rounded-md cursor-pointer
        shadow-sm transition-colors duration-200 items-center
        hover:opacity-90 focus-visible:outline-2 
        focus-visible:outline-offset-2
        disabled:cursor-not-allowed 
        ${className}
      `}
    >
      {children}
      {text}
    </button>
  );
};

export default ButtonComponent;
