import React from "react";
import clsx from "clsx";

type InputProps = {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-medium text-sm">{label}</label>}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-gray-400">{leftIcon}</span>
        )}

        <input
          className={clsx(
            "w-full rounded-lg border border-gray-300 outline-none transition-all px-3 py-2",
            leftIcon && "pl-10", // 🔹 Kalau ada icon kiri, tambah padding kiri
            rightIcon && "pr-10", // 🔹 Kalau ada icon kanan, tambah padding kanan
            error && "border-red-500 focus:ring-red-300", // 🔹 Kalau error, warna merah
            className
          )}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 text-gray-400">{rightIcon}</span>
        )}
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;
