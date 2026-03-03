import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg border border-gray-700 bg-surface px-3 py-2 text-xs font-medium text-gray-100 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

