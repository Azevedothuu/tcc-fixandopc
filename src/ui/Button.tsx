import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

function Button({
  variant = "primary",
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  let style = "";

  if (variant === "primary") {
    style = "bg-orange text-white hover:bg-orange-600";
  } else if (variant === "secondary") {
    style = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "danger") {
    style = "bg-red-600 text-white hover:bg-red-700";
  } else if (variant === "outline") {
    style = "border border-gray-400 text-gray-700 hover:bg-gray-100";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer px-4 py-2 rounded-md font-semibold transition disabled:opacity-60 ${style} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
