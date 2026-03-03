import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", children, ...rest }: SelectProps) {
  return (
    <select
      className={`w-full rounded-lg border border-gray-800 bg-surface py-2 px-3 text-xs text-gray-100 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}

