import React from "react";
import clsx from "clsx";

type LoaderProps = {
  icon?: React.ReactNode;
  size?: number;
  colorClass?: string;
  fullscreen?: boolean;
};

export default function Loader({
  icon,
  size = 40,
  colorClass = "text-gray-600",
  fullscreen = false,
}: LoaderProps) {
  return (
    <div
      className={clsx(
        fullscreen &&
          "fixed inset-0 flex items-center justify-center bg-white/90 z-50"
      )}
    >
      <span
        className={clsx(
          "animate-spin flex items-center justify-center",
          colorClass
        )}
        style={{ width: size, height: size }}
      >
        {icon}
      </span>
    </div>
  );
}
