import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  isLoading?: boolean; 
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode; 
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyle =
    "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  const variantStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyle = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        baseStyle,
        variantStyle[variant],
        sizeStyle[size],
        className
      )}
      disabled={isLoading || props.disabled} // 🔹 Disable saat loading
      {...props}
    >
      {/* 🔹 Icon kiri muncul hanya kalau ada dan tidak loading */}
      {leftIcon && !isLoading && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}

      {/* 🔹 Saat loading, ganti teks jadi spinner */}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}

      {/* 🔹 Icon kanan muncul hanya kalau ada dan tidak loading */}
      {rightIcon && !isLoading && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
