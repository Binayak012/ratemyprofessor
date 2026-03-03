import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...rest }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-800 bg-surface py-2 px-3 text-xs text-gray-100 outline-none transition-colors placeholder:text-gray-500 focus:border-accent focus:ring-1 focus:ring-accent ${className}`}
      {...rest}
    />
  );
}

